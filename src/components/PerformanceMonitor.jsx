import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const PerformanceMonitor = ({
  showMetrics = false,
  logToConsole = true,
  trackInteractions = true,
  enabled = true,
}) => {
  const [metrics, setMetrics] = useState({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    loadTime: null,
    domNodes: 0,
    jsHeapSize: null,
    bundleSize: null,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [connectionInfo, setConnectionInfo] = useState({});

  const initPerformanceObserver = useCallback(() => {
    if (!("PerformanceObserver" in window)) return;

    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      setMetrics((prev) => ({ ...prev, lcp: Math.round(lastEntry.startTime) }));

      if (logToConsole) {
        console.log("🎯 LCP:", Math.round(lastEntry.startTime), "ms");
      }
    });

    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        setMetrics((prev) => ({
          ...prev,
          fid: Math.round(entry.processingStart - entry.startTime),
        }));

        if (logToConsole) {
          console.log(
            "⚡ FID:",
            Math.round(entry.processingStart - entry.startTime),
            "ms"
          );
        }
      });
    });

    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      list.getEntries().forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });

      setMetrics((prev) => ({
        ...prev,
        cls: Math.round(clsValue * 1000) / 1000,
      }));

      if (logToConsole && clsValue > 0) {
        console.log("📐 CLS:", Math.round(clsValue * 1000) / 1000);
      }
    });

    try {
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      fidObserver.observe({ entryTypes: ["first-input"] });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
    } catch (error) {
      console.warn("Performance Observer not supported:", error);
    }

    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, [logToConsole]);

  const getNavigationMetrics = useCallback(() => {
    if (!("performance" in window)) return;

    const navigation = performance.getEntriesByType("navigation")[0];
    if (!navigation) return;

    const fcp = performance.getEntriesByName("first-contentful-paint")[0];
    const ttfb = navigation.responseStart - navigation.requestStart;
    const loadTime = navigation.loadEventEnd - navigation.navigationStart;

    setMetrics((prev) => ({
      ...prev,
      fcp: fcp ? Math.round(fcp.startTime) : null,
      ttfb: Math.round(ttfb),
      loadTime: Math.round(loadTime),
      domNodes: document.querySelectorAll("*").length,
    }));

    if (logToConsole) {
      console.log("🚀 Performance Metrics:", {
        FCP: fcp ? `${Math.round(fcp.startTime)}ms` : "N/A",
        TTFB: `${Math.round(ttfb)}ms`,
        "Load Time": `${Math.round(loadTime)}ms`,
        "DOM Nodes": document.querySelectorAll("*").length,
      });
    }
  }, [logToConsole]);

  const getMemoryUsage = useCallback(() => {
    if ("memory" in performance) {
      const memory = performance.memory;
      setMetrics((prev) => ({
        ...prev,
        jsHeapSize: Math.round(memory.usedJSHeapSize / 1048576),
      }));
    }
  }, []);

  const getConnectionInfo = useCallback(() => {
    if ("connection" in navigator) {
      const conn = navigator.connection;
      setConnectionInfo({
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
        saveData: conn.saveData,
      });
    }
  }, []);

  const trackUserInteractions = useCallback(() => {
    if (!trackInteractions) return;

    let interactionCount = 0;
    const interactions = [];

    const trackInteraction = (type, target) => {
      interactionCount++;
      interactions.push({
        type,
        target: target.tagName,
        timestamp: performance.now(),
      });

      if (interactions.length > 50) {
        interactions.shift();
      }
    };

    document.addEventListener("click", (e) =>
      trackInteraction("click", e.target)
    );
    document.addEventListener(
      "scroll",
      () => trackInteraction("scroll", document.body),
      { passive: true }
    );
    document.addEventListener("keydown", (e) =>
      trackInteraction("keydown", e.target)
    );

    return () => {
      document.removeEventListener("click", trackInteraction);
      document.removeEventListener("scroll", trackInteraction);
      document.removeEventListener("keydown", trackInteraction);
    };
  }, [trackInteractions]);

  const estimateBundleSize = useCallback(() => {
    const scripts = Array.from(document.querySelectorAll("script[src]"));
    const stylesheets = Array.from(
      document.querySelectorAll('link[rel="stylesheet"]')
    );

    Promise.all([
      ...scripts.map((script) =>
        fetch(script.src, { method: "HEAD" })
          .then((response) =>
            parseInt(response.headers.get("content-length") || "0")
          )
          .catch(() => 0)
      ),
      ...stylesheets.map((link) =>
        fetch(link.href, { method: "HEAD" })
          .then((response) =>
            parseInt(response.headers.get("content-length") || "0")
          )
          .catch(() => 0)
      ),
    ]).then((sizes) => {
      const totalSize = sizes.reduce((sum, size) => sum + size, 0);
      setMetrics((prev) => ({
        ...prev,
        bundleSize: Math.round(totalSize / 1024),
      }));
    });
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const cleanup = initPerformanceObserver();

    if (document.readyState === "complete") {
      getNavigationMetrics();
      getMemoryUsage();
      getConnectionInfo();
      estimateBundleSize();
    } else {
      window.addEventListener("load", () => {
        setTimeout(() => {
          getNavigationMetrics();
          getMemoryUsage();
          getConnectionInfo();
          estimateBundleSize();
        }, 1000);
      });
    }

    const interactionCleanup = trackUserInteractions();

    const interval = setInterval(() => {
      getMemoryUsage();
    }, 30000);

    return () => {
      if (cleanup) cleanup();
      if (interactionCleanup) interactionCleanup();
      clearInterval(interval);
    };
  }, [
    enabled,
    initPerformanceObserver,
    getNavigationMetrics,
    getMemoryUsage,
    getConnectionInfo,
    estimateBundleSize,
    trackUserInteractions,
  ]);

  const getPerformanceScore = () => {
    const { fcp, lcp, fid, cls, ttfb } = metrics;
    let score = 100;

    if (fcp > 3000) score -= 20;
    else if (fcp > 1800) score -= 10;

    if (lcp > 4000) score -= 25;
    else if (lcp > 2500) score -= 15;

    if (fid > 300) score -= 20;
    else if (fid > 100) score -= 10;

    if (cls > 0.25) score -= 15;
    else if (cls > 0.1) score -= 8;

    if (ttfb > 1800) score -= 10;
    else if (ttfb > 800) score -= 5;

    return Math.max(0, Math.round(score));
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  if (!enabled || !showMetrics) return null;

  return (
    <>
      {}
      <motion.button
        className="fixed bottom-4 right-4 z-40 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center"
        onClick={() => setIsVisible(!isVisible)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Performance Monitor"
      >
        📊
      </motion.button>

      {}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed bottom-20 right-4 z-40 bg-black/90 backdrop-blur-sm text-white p-4 rounded-xl shadow-2xl w-80 max-h-96 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Performance Monitor</h3>
              <div
                className={`text-2xl font-bold ${getScoreColor(
                  getPerformanceScore()
                )}`}
              >
                {getPerformanceScore()}
              </div>
            </div>

            {}
            <div className="space-y-3 mb-4">
              <h4 className="text-sm font-semibold text-blue-400">
                Core Web Vitals
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/10 p-2 rounded">
                  <div className="text-gray-400">FCP</div>
                  <div className="font-mono">
                    {metrics.fcp ? `${metrics.fcp}ms` : "⏳"}
                  </div>
                </div>
                <div className="bg-white/10 p-2 rounded">
                  <div className="text-gray-400">LCP</div>
                  <div className="font-mono">
                    {metrics.lcp ? `${metrics.lcp}ms` : "⏳"}
                  </div>
                </div>
                <div className="bg-white/10 p-2 rounded">
                  <div className="text-gray-400">FID</div>
                  <div className="font-mono">
                    {metrics.fid ? `${metrics.fid}ms` : "⏳"}
                  </div>
                </div>
                <div className="bg-white/10 p-2 rounded">
                  <div className="text-gray-400">CLS</div>
                  <div className="font-mono">
                    {metrics.cls !== null ? metrics.cls : "⏳"}
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="space-y-3 mb-4">
              <h4 className="text-sm font-semibold text-green-400">
                System Info
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/10 p-2 rounded">
                  <div className="text-gray-400">TTFB</div>
                  <div className="font-mono">
                    {metrics.ttfb ? `${metrics.ttfb}ms` : "⏳"}
                  </div>
                </div>
                <div className="bg-white/10 p-2 rounded">
                  <div className="text-gray-400">Load Time</div>
                  <div className="font-mono">
                    {metrics.loadTime ? `${metrics.loadTime}ms` : "⏳"}
                  </div>
                </div>
                <div className="bg-white/10 p-2 rounded">
                  <div className="text-gray-400">DOM Nodes</div>
                  <div className="font-mono">{metrics.domNodes}</div>
                </div>
                <div className="bg-white/10 p-2 rounded">
                  <div className="text-gray-400">JS Heap</div>
                  <div className="font-mono">
                    {metrics.jsHeapSize ? `${metrics.jsHeapSize}MB` : "N/A"}
                  </div>
                </div>
              </div>
            </div>

            {}
            {Object.keys(connectionInfo).length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-purple-400">
                  Connection
                </h4>
                <div className="text-xs bg-white/10 p-2 rounded">
                  <div>Type: {connectionInfo.effectiveType}</div>
                  <div>Downlink: {connectionInfo.downlink} Mbps</div>
                  <div>RTT: {connectionInfo.rtt}ms</div>
                  {connectionInfo.saveData && (
                    <div className="text-orange-400">Data Saver: ON</div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-4 text-xs text-gray-400 text-center">
              Updated: {new Date().toLocaleTimeString()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

PerformanceMonitor.propTypes = {
  showMetrics: PropTypes.bool,
  logToConsole: PropTypes.bool,
  trackInteractions: PropTypes.bool,
  enabled: PropTypes.bool,
};

export default PerformanceMonitor;

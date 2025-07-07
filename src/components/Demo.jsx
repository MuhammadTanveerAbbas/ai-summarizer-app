import { useState, useEffect, useCallback } from "react";
import {
  copy as copyIcon,
  linkIcon,
  loader,
  tick as tickIcon,
} from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

/**
 * Single link entry in history.
 */
const LinkCard = ({ url, isCopied, onSelect, onCopy }) => (
  <div
    onClick={() => onSelect(url)}
    className="link_card"
    role="button"
    tabIndex={0}
    onKeyDown={(e) => (e.key === "Enter" ? onSelect(url) : null)}
    aria-label={`Load summary for ${url}`}
  >
    <button
      onClick={(e) => {
        e.stopPropagation();
        onCopy(url);
      }}
      className="copy_btn"
      aria-label={isCopied ? "Copied" : "Copy URL"}
    >
      <img
        src={isCopied ? tickIcon : copyIcon}
        alt={isCopied ? "Copied icon" : "Copy icon"}
        className="w-[40%] h-[40%] object-contain"
      />
    </button>
    <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
      {url}
    </p>
  </div>
);

/**
 * Displays the summary or any loading/error state.
 */
const Summary = ({ summary, isLoading, error }) => {
  if (isLoading) {
    return (
      <img
        src={loader}
        alt="Loading..."
        className="w-20 h-20 object-contain"
        role="status"
      />
    );
  }
  if (error) {
    return (
      <p className="font-inter font-bold text-black text-center">
        Unexpected error occurred.
        <br />
        <span className="font-satoshi font-normal text-gray-700">
          {error?.data?.error || "Please try again."}
        </span>
      </p>
    );
  }
  if (!summary) {
    return null;
  }
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-satoshi font-bold text-gray-600 text-xl">
        Article <span className="blue_gradient">Summary</span>
      </h2>
      <div className="summary_box">
        <p className="font-inter font-medium text-sm text-gray-700">
          {summary}
        </p>
      </div>
    </div>
  );
};

const Demo = () => {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [history, setHistory] = useState([]);
  const [copiedUrl, setCopiedUrl] = useState(null);

  const [getSummary, { data, error, isFetching }] = useLazyGetSummaryQuery();

  // Load history from localStorage once
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("articles") || "[]");
    setHistory(stored);
  }, []);

  // Sync history to localStorage on change
  useEffect(() => {
    localStorage.setItem("articles", JSON.stringify(history));
  }, [history]);

  // Fetch summary
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!url.trim()) return;

      const { data: result } = await getSummary({ articleUrl: url });
      if (result?.summary) {
        setSummary(result.summary);
        const entry = { url, summary: result.summary };
        setHistory((prev) => [entry, ...prev.filter((a) => a.url !== url)]);
      }
    },
    [url, getSummary]
  );

  // Copy to clipboard with feedback
  const handleCopy = useCallback((copyTarget) => {
    navigator.clipboard.writeText(copyTarget);
    setCopiedUrl(copyTarget);
    setTimeout(() => setCopiedUrl(null), 3000);
  }, []);

  // Select from history
  const handleSelect = useCallback(
    (selectedUrl) => {
      const found = history.find((a) => a.url === selectedUrl);
      if (found) {
        setUrl(found.url);
        setSummary(found.summary);
      }
    },
    [history]
  );

  return (
    <section className="mt-16 w-full max-w-xl mx-auto">
      {/* URL Input */}
      <form
        className="relative flex items-center mb-4"
        onSubmit={handleSubmit}
        aria-label="URL submission form"
      >
        <img
          src={linkIcon}
          alt=""
          className="absolute left-3 w-5 pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="url"
          placeholder="Enter article URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="url_input peer"
          required
          aria-required="true"
          aria-label="Article URL"
        />
        <button
          type="submit"
          className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          aria-label="Fetch summary"
        >
          ↵
        </button>
      </form>

      {/* History Panel */}
      <div className="flex flex-col gap-2 max-h-60 overflow-y-auto mb-6">
        {history.map(({ url: itemUrl }, idx) => (
          <LinkCard
            key={idx}
            url={itemUrl}
            isCopied={copiedUrl === itemUrl}
            onSelect={handleSelect}
            onCopy={handleCopy}
          />
        ))}
      </div>

      {/* Summary / Loader / Error */}
      <div className="flex justify-center items-center my-10">
        <Summary summary={summary} isLoading={isFetching} error={error} />
      </div>
    </section>
  );
};

export default Demo;

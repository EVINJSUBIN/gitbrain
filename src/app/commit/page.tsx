"use client";

import { useState } from 'react';
import styles from './commit.module.css';

export default function CommitGenerator() {
  const [diff, setDiff] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generateCommit = async () => {
    if (!diff) return;
    setLoading(true);
    try {
      const response = await fetch('/api/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diff }),
      });
      const data = await response.json();
      setResult(data.result || 'Error generating commit');
    } catch (err) {
      setResult('Failed to connect to API');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className="text-gradient">AI Commit Generator</h1>
      <p className={styles.description}>
        Paste your git diff below, and GitBrain will generate a perfect conventional commit message.
      </p>
      
      <div className={styles.workspace}>
        <div className={styles.inputArea}>
          <label htmlFor="diff-input">Git Diff</label>
          <textarea 
            id="diff-input"
            className={`${styles.textarea} glass`}
            placeholder="Paste your git diff here..."
            value={diff}
            onChange={(e) => setDiff(e.target.value)}
          />
          <button className={styles.generateButton} onClick={generateCommit} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Commit'}
          </button>
        </div>
        
        <div className={styles.outputArea}>
          <label>Generated Commit</label>
          <div className={`${styles.resultBox} glass`}>
            {result ? (
              <span>{result}</span>
            ) : (
              <span className={styles.placeholderText}>Your commit message will appear here...</span>
            )}
          </div>
          <button className={styles.copyButton} onClick={copyToClipboard} disabled={!result}>
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
}

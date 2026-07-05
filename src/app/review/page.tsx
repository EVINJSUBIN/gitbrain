"use client";

import { useState } from 'react';
import styles from './review.module.css';

export default function CodeReviewer() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const analyzeCode = async () => {
    if (!code) return;
    setLoading(true);
    setResult('');
    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      setResult(data.result || 'Error analyzing code');
    } catch (err) {
      setResult('Failed to connect to API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className="text-gradient">AI Code Reviewer</h1>
      <p className={styles.description}>
        Paste your code below to get a comprehensive review, bug detection, and refactoring suggestions.
      </p>
      
      <div className={styles.workspace}>
        <div className={styles.inputArea}>
          <label htmlFor="code-input">Source Code</label>
          <textarea 
            id="code-input"
            className={`${styles.textarea} glass`}
            placeholder="Paste your TypeScript, JavaScript, or React code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className={styles.analyzeButton} onClick={analyzeCode} disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze Code'}
          </button>
        </div>
        
        <div className={styles.outputArea}>
          <label>Review & Feedback</label>
          <div className={`${styles.resultBox} glass`}>
            {result ? (
              <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>
            ) : (
              <div className={styles.placeholderState}>
                <span className={styles.icon}>🔍</span>
                <span className={styles.placeholderText}>
                  {loading ? 'Analyzing code...' : 'Waiting for code to analyze...'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

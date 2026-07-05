import styles from './review.module.css';

export default function CodeReviewer() {
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
          />
          <button className={styles.analyzeButton}>
            Analyze Code
          </button>
        </div>
        
        <div className={styles.outputArea}>
          <label>Review & Feedback</label>
          <div className={`${styles.resultBox} glass`}>
            <div className={styles.placeholderState}>
              <span className={styles.icon}>🔍</span>
              <span className={styles.placeholderText}>Waiting for code to analyze...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

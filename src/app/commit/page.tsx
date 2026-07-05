import styles from './commit.module.css';

export default function CommitGenerator() {
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
          />
          <button className={styles.generateButton}>
            Generate Commit
          </button>
        </div>
        
        <div className={styles.outputArea}>
          <label>Generated Commit</label>
          <div className={`${styles.resultBox} glass`}>
            <span className={styles.placeholderText}>Your commit message will appear here...</span>
          </div>
          <button className={styles.copyButton}>
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
}

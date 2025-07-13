import touchMePreview from '../assets/images/touch-me-preview.png';
import clickrushPreview from '../assets/images/clickrush-preview.png';
import emojiPreview from '../assets/images/emogy-preview.png';

export default function MultiColumn() {
  return (
    <section id="games" className="multi-column projects-grid playground-grid">
      <div className="project playground-card">
        <img src={touchMePreview} alt="Touch Me Game Preview" />
        <h3>Touch Me</h3>
        <p>Test your reflexes in this tap-fast game. Ready, set, go!</p>
        <button className="resume-button center-btn">Play Now</button>
      </div>

      <div className="project playground-card">
        <img src={clickrushPreview} alt="Click Rush Game Preview" />
        <h3>Click Rush</h3>
        <p>How fast are you? Tap emojis before time runs out!</p>
        <button className="resume-button center-btn">Play Now</button>
      </div>

      <div className="project playground-card">
        <img src={emojiPreview} alt="Emoji Match Game Preview" />
        <h3>Match Emogy</h3>
        <p>Flip the cards and match emojis in fewer moves.</p>
        <button className="resume-button center-btn">Play Now</button>
      </div>
    </section>
  );
}
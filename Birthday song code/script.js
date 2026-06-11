const card = document.getElementById('card');
const music = document.getElementById('birthdayMusic');
const track = document.getElementById('track');
const progress = document.getElementById('progress');
const clickText = document.getElementById('clickText');
const shapesContainer = document.getElementById('shapes');

let isPlaying = false;
let currentLine = 0;

// Lyrics change timing setup (in milliseconds)
const lyricTimings = [0, 3000, 6000, 9000]; 
const totalLines = 4;

// Clicking on the card will start music and scrolling.
card.addEventListener('click', () => {
    if (isPlaying) return; //Once triggered, it will not re-trigger.
    isPlaying = true;
    
    //Stopping jump animation and starting music and lyrics animation.
    card.style.animation = 'none';
    clickText.innerText = "🎵 Playing Birthday Track...";
    music.play().catch(err => console.log("Audio play blocked: ", err));

    startLyricsAnimation();
});

// Lyrics scroll engine
function startLyricsAnimation() {
    const paragraphs = track.querySelectorAll('p');
    
    function updateLyrics() {
        if (currentLine >= totalLines) {
            // The song will loop again when it ends.
            currentLine = 0;
        }

        // Remove active class from all lines
        paragraphs.forEach(p => p.classList.remove('active'));
        
        // Highlight the current line
        paragraphs[currentLine].classList.add('active');

        // Scroll the track (30 pixels per line)
        track.style.top = `-${currentLine * 30}px`;

        currentLine++;
        setTimeout(updateLyrics, 3000); // Update every 3 seconds
    }

    updateLyrics();

    // Progress bar animation loop
    setInterval(() => {
        if (!music.paused) {
            const percentage = (music.currentTime / music.duration) * 100;
            progress.style.width = `${percentage}%`;
        }
    }, 100);
}

// Floating geometric shapes in the background (Triangles & Squares)
function createFloatingShapes() {
    for (let i = 0; i < 20; i++) {
        const shape = document.createElement('div');
        const isTriangle = Math.random() > 0.5;

        shape.className = isTriangle ? 'shape triangle' : 'shape square';
        
        // Random size and position
        shape.style.left = `${Math.random() * 100}vw`;
        shape.style.animationDelay = `${Math.random() * 12}s`;
        shape.style.animationDuration = `${Math.random() * 6 + 8}s`;

        shapesContainer.appendChild(shape);
    }
}

createFloatingShapes();
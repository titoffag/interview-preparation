export function solution(player, platforms, audioContext, destination) {
    let { x, y, vx, vy, ax, ay } = player;

    vx += ax;
    vy += ay;

    x += vx;
    y += vy;

    platforms.forEach(platform => {
        const platformTop = platform.y + platform.height / 2;
        const platformBottom = platform.y - platform.height / 2;
        const platformLeft = platform.x - platform.width / 2;
        const platformRight = platform.x + platform.width / 2;

        if (x >= platformLeft && x <= platformRight && y >= platformBottom && y <= platformTop && vy < 0) {
            y = platformTop;
            vx = -vx;
            vy = -0.5 * vy;

            const oscillator = audioContext.createOscillator();
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(platform.freq, audioContext.currentTime);
            const gainNode = audioContext.createGain();
            gainNode.gain.setValueAtTime(1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.25);  // 250ms duration

            oscillator.connect(gainNode);
            gainNode.connect(destination);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.25);  // Stop after 250ms
        }
    });

    return { x, y, vx, vy, ax, ay };
}

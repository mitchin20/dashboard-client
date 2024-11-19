export const createRipple = (
    e: React.MouseEvent<HTMLDivElement>,
    heroRef: React.RefObject<HTMLDivElement>
) => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    // Define the number of ripples per click
    const numRipples = 3;

    // Loop to create multiple ripples
    for (let i = 0; i < numRipples; i++) {
        const ripple = document.createElement("span");
        const diameter = Math.max(
            heroElement.clientWidth,
            heroElement.clientHeight
        );
        const radius = diameter / 2;

        // Set position and size for the ripple
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${e.clientX - heroElement.getBoundingClientRect().left - radius}px`;
        ripple.style.top = `${e.clientY - heroElement.getBoundingClientRect().top - radius}px`;

        // Apply the ripple class
        ripple.classList.add("ripple");

        // Apply different animation durations for each ripple to create a delay effect
        ripple.style.animationDuration = `${1.2 + i * 0.5}s`; // e.g., 1.2s, 1.7s, 2.2s

        // Append the ripple to the hero section
        heroElement.appendChild(ripple);

        // Remove the ripple after the animation ends
        requestAnimationFrame(() => {
            ripple.addEventListener("animationend", () => {
                ripple.remove();
            });
        });
    }
};

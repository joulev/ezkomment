/**
 * @author Treer <gitlab.com/Treer>
 * @see {@link https://freesvg.org/users-profile-icon}
 * @note Slightly modified by Vu Van Dung to change the colour to match site colour theme
 */
export default function DefaultPhoto({ size = 36 }: { size?: number }) {
  return (
    <svg version="1.1" width={size} height={size} viewBox="0 0 600 600">
      <defs>
        <clipPath id="circular-border">
          <circle cx="300" cy="300" r="280" />
        </clipPath>
        <clipPath id="avoid-antialiasing-bugs">
          <rect width="100%" height="498" />
        </clipPath>
      </defs>
      <circle cx="300" cy="300" r="280" fill="#64748B" clipPath="url(#avoid-antialiasing-bugs)" />
      <circle cx="300" cy="230" r="115" fill="#E2E8F0" />
      <circle cx="300" cy="550" r="205" fill="#E2E8F0" clipPath="url(#circular-border)" />
    </svg>
  );
}

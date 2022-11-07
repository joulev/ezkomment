export type Props = {
  size?: number;
};

export default function Logo({ size = 72 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="12" y="15" width="56" height="41" fill="white" />
      <path
        d="M40 0C17 0 0 15.6246 0 33.2652C0 49.9866 14.3759 59.9151 21.8359 63.0508C22.429 63.3001 22.6701 64.0268 22.3241 64.5727L13.5329 78.4435C12.9804 79.3152 13.9332 80.36 14.8413 79.8782L39.7813 66.6464C39.925 66.5702 40.0866 66.5306 40.2489 66.5298C63.1225 66.4176 80 50.8421 80 33.2652C80 15.6246 63 0 40 0ZM37 54.434L17 37.2974L22 31.2491L36 43.3456L57 19.1527L63 24.1929L37 54.434Z"
        className="fill-indigo-500"
      />
    </svg>
  );
}

import { FC } from "react";

import Button from "~/client/components/buttons";

import BeyondTheBoundary from "./beyond";
import OpenSource from "./open";

const SpaceshipSVG: FC = () => (
  <svg width="93" height="184" viewBox="0 0 93 184" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M36.5382 151.077H56.5381M36.5382 151.077C36.5382 151.077 36.5382 152.077 11.5382 181.077C-3.46151 112.077 -3.46152 81.0771 26.0872 112.577M36.5382 151.077C36.5382 151.077 31.1465 134.605 26.0872 112.577M56.5381 151.077C56.5381 151.077 61.9298 134.605 66.9891 112.577M56.5381 151.077L81.5382 181.077C96.5385 112.077 96.5385 81.0771 66.9891 112.577M26.0872 112.577C15.8795 68.1338 7.025 1.07715 46.5381 1.07715C86.0512 1.07715 77.1968 68.1338 66.9891 112.577M46.5381 112.577V180.077M46.5381 31.0771C40.5385 31.0771 36.5382 35.0771 36.5382 41.0771C36.5382 47.0771 40.5378 51.0771 46.5381 51.0771C52.5385 51.0771 56.5381 47.0771 56.5381 41.0771C56.5381 35.0771 52.5378 31.0771 46.5381 31.0771Z"
      className="stroke-current"
    />
  </svg>
);

const FinalSections: FC = () => {
  return (
    <div className="stars">
      <div className="container flex flex-row flex-wrap gap-x-24">
        <div>
          <SpaceshipSVG />
        </div>
        <div className="flex-1">
          <BeyondTheBoundary />
          <OpenSource />
        </div>
        <div className="w-full rounded border bg-card border-card p-12 flex flex-row items-center mb-18">
          <h2 className="flex-grow my-0 text-3xl">Get started, for completely free!</h2>
          <div className="flex flex-col gap-6 text-xl">
            <Button href="/auth">Get started</Button>
            <Button href="/docs" variant="tertiary" className="px-12">
              Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalSections;
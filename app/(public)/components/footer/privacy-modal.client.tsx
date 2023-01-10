"use client";

import { useState } from "react";
import A from "~/app/components/anchor.client";
import Button from "~/app/components/buttons.client";
import Modal from "~/app/components/modal.client";
import RightAligned from "~/app/components/utils/right-aligned";

export default function PrivacyModal() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const decline = () => {
    setShowPrivacyModal(false);
    localStorage.setItem("privacy-consent", "declined");
  };
  const accept = () => {
    setShowPrivacyModal(false);
    localStorage.setItem("privacy-consent", "accepted");
  };
  return (
    <>
      <A onClick={() => setShowPrivacyModal(true)} className="text-muted hover:text-muted">
        Privacy
      </A>
      <Modal isVisible={showPrivacyModal} onOutsideClick={() => setShowPrivacyModal(false)}>
        <div className="p-6 max-w-2xl text-sm sm:text-base text-neutral-900 dark:text-neutral-200">
          <h2>Privacy</h2>
          <p>
            If you sign in to the app, we will use some cookies to handle the authentication process.
            They are essential cookies and cannot be turned off. They do not track you in any way.
          </p>
          <p>
            We also make use of a <A href="https://firebase.google.com">Firebase</A> project with
            Google Analytics turned off. We also never store any of your data permanently: on
            page/site/account deletion, all data associated to it will be forever deleted. However,
            Firebase may collect some metadata behind the scenes, which we cannot control and we do
            not make use of.
          </p>
          <p>
            We <strong>do</strong> collect web vitals and other metrics, including your IP address,
            your user agent and your approximate geolocation (accurate to the city level). It is not
            traceable to you, and we also do not share this data with anyone. The data helps us
            enhance and make improvements to our product, however if you do not want to share this
            information, you can always decline by clicking the button below.
          </p>
          <p>You can go here to update your preferences at any time.</p>
          <RightAligned className="gap-6">
            <Button variant="tertiary" onClick={decline}>
              Decline
            </Button>
            <Button onClick={accept}>Accept</Button>
          </RightAligned>
        </div>
      </Modal>
    </>
  );
}

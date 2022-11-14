"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus, Tag, Link } from "lucide-react";
import { SITE } from "~/misc/validate";
import { internalPost } from "~/app/(auth)/internal-fetch";
import * as E from "~/app/(auth)/errors";
import { useLoadingState } from "~/app/loading-state";
import { useAuth } from "~/app/(auth)/app/auth";
import { useSetToast } from "~/app/(auth)/toast";
import A from "~/app/components/anchor.client";
import AuthError from "~/app/components/auth-error";
import Button from "~/app/components/buttons.client";
import InputDetachedLabel from "~/app/components/forms/input-detached-label";

export default function AppNewPage() {
  const router = useRouter();
  const { user, mutate } = useAuth();
  const { setLoading } = useLoadingState();
  const setToast = useSetToast();
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");

  const createNewSite = async (name: string, domain: string) => {
    setLoading(true);
    if (user.sites.find(s => s.name === name)) throw E.SITE_ALREADY_EXISTS;
    const { success, status } = await internalPost("/api/sites", { name, domain, iconURL: null });
    if (status === 409) throw E.SITE_ALREADY_EXISTS;
    if (!success) throw E.UNABLE_TO_CREATE_SITE;
    await mutate();
    setLoading(false);
    router.push(`/app/site/${name}`);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (!SITE.nameIsValid(name) || !SITE.domainIsValid(domain)) return;
    try {
      await createNewSite(name, domain);
      setToast({ type: "success", message: "Site created successfully!" });
    } catch (err: any) {
      setToast({ type: "error", message: <AuthError err={err} /> });
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto md:max-w-lg">
      <h1>Add a new site</h1>
      <p>
        A new site let you host comments for all webpages under any domain or subdomain.{" "}
        <A href="/docs/sites-and-pages/introduction#should-i-create-a-new-site-or-a-new-page">
          Should I create a new site or page?
        </A>
      </p>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <InputDetachedLabel
          label="Site name"
          type="text"
          icon={Tag}
          required
          value={name}
          onChange={event => setName(event.target.value)}
          isInvalid={(name.length > 0 || domain.length > 0) && !SITE.nameIsValid(name)}
          helpText={
            <>
              The site name helps identify this site with other sites you also have. It can only
              contain lowercase letters, digits and hyphens. It must start with a letter and be at
              least 3 characters long.
            </>
          }
        />
        <InputDetachedLabel
          label="Site domain"
          type="text"
          icon={Link}
          required
          value={domain}
          onChange={event => setDomain(event.target.value)}
          isInvalid={(name.length > 0 || domain.length > 0) && !SITE.domainIsValid(domain)}
          placeholder="example.com, mysite.example.com, &hellip;"
          helpText={
            <>
              The hostname of the website where you want to host the comments. It can be any domain
              or subdomain with a valid protocol or a wildcard (<code>*</code>) to match all
              domains. Other websites will not be allowed to host the comments.{" "}
              <A href="/docs/sites-and-pages/create-new-site#site-domain">Read more</A>.
            </>
          }
        />
        <Button icon={Plus} disabled={!(SITE.nameIsValid(name) && SITE.domainIsValid(domain))}>
          Add a new site
        </Button>
      </form>
    </div>
  );
}

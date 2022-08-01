import { NextPage as _NextPage, GetStaticProps as _GetStaticProps } from "next";

export type DemoPageProps = {
    bgClass: string;
    template: "default" | "not used" | { url: string };
    darkMode: boolean;
    sourceURL: string;
    title: string;
};

type AppPageProps = DemoPageProps | { isNotDemo: true };

export type NextPage = _NextPage<AppPageProps>;

export type GetStaticProps = _GetStaticProps<AppPageProps>;

import { AppInitialProps } from "next/app";
import { NextPageContext } from "next";

export interface AppWithStore extends AppInitialProps {}

export interface ReduxNextPageContext extends NextPageContext {}

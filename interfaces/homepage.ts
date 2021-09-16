import { NextPageContext } from "next";
export interface HomepageProps extends NextPageContext {
    responseData: {
        page: number,
        results: object[],
        total_pages: number,
        total_results: number
    },
    isError: boolean
}

export interface User {
    last_name(first_name: (first_name: any, last_name: any) => import("react").ReactNode, last_name: any): import("react").ReactNode;
    first_name(first_name: any, last_name: any): import("react").ReactNode;
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

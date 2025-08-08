import React from "react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { LoginForm } from "../../components/loginForm";
import { Aside } from "../../components/aside";

export const Login = () => {
    return (
        <div className="flex w-full h-screen">
            <Aside /> 
            <div className="flex flex-col lg:w-1/2 w-full h-full">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <LoginForm />
                </main>
            </div>
        </div>
    )
}
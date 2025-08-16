import { Header } from "../../../components/auth/header";
import { ForgotPasswordForm } from "../../../components/auth/forgotPasswordForm";

export const ForgotPassword = () => {
    return (
        <div className="flex w-full h-screen">
            <div className="flex flex-col w-full h-full">
                <Header />
                <main className="flex justify-center items-center h-screen">
                    <ForgotPasswordForm />
                </main>
            </div>
        </div>
    )
}
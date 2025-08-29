import { Header } from "../../../components/main/header";
import { ResetPasswordForm } from "../../../components/auth/resetPasswordForm";

export const ResetPassword = () => {
    return (
        <div className="flex w-full h-screen">
            <div className="flex flex-col w-full h-full">
                <Header />
                <main className="flex justify-center items-center h-screen">
                    <ResetPasswordForm />
                </main>
            </div>
        </div>
    )
}
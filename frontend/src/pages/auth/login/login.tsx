import { Header } from "../../../components/main/header";
import { Footer } from "../../../components/main/footer";
import { LoginForm } from "../../../components/auth/loginForm";
import { Aside } from "../../../components/auth/aside";

export const Login = () => {
    return (
        <div className="flex w-full h-screen">
            <Aside side="left"/> 
            <div className="flex flex-col lg:w-1/2 w-full h-full">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <LoginForm />
                </main>
                <Footer title="Войти"/>
            </div>
        </div>
    )
}
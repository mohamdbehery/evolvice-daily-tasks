import React from "react";
import { render, fireEvent} from "@testing-library/react";
import { Login } from "../components/login";
import { store } from "../store/store";

describe("//- Login Component Test Cases -//", () => {
  test("Login form shot", async () => {
    const { findByTestId } = renderLogin();
    const loginForm = await findByTestId("login-form");
    const TextInputComponent = loginForm.shadowRoot;
    expect(TextInputComponent).toMatchSnapshot();
  });

  test("Login contains 2 inputs (username, password) and 1 login button", async () => {
    const { findByTestId } = renderLogin();
    const loginForm = await findByTestId("login-form");
    const inputs = loginForm.getElementsByTagName('input');
    const buttons = loginForm.getElementsByTagName('button');
    expect(inputs.length).toBe(2);
    expect(buttons.length).toBe(1);
  });

  test("Login check username input change", async () => {
    const usernameMoc = jest.fn();
    const { findByTestId } = renderLogin({ username_Change: usernameMoc });
    const username = await findByTestId("username");  
    fireEvent.change(username, { target: { value: "test" } });  
    expect(usernameMoc).toHaveBeenCalled();
  });

  
  test("Login check password input change", async () => {
    const passwordMoc = jest.fn();
    const { findByTestId } = renderLogin({ password_Change: passwordMoc });
    const password = await findByTestId("password");  
    fireEvent.change(password, { target: { value: "test" } });  
    expect(passwordMoc).toHaveBeenCalled();
  });

  test("Login check login button click", async () => {
    const loginMoc = jest.fn();
    const { findByTestId } = renderLogin({
      login_Click: loginMoc
    });
    const username = await findByTestId("username");
    const password = await findByTestId("password");
    const btnLogin = await findByTestId("login");
  
    fireEvent.change(username, { target: { value: "test" } });
    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.click(btnLogin);
  
    expect(loginMoc).toHaveBeenCalled;
  });

  function renderLogin(props: Partial<any> = {}) {
    const defaultProps: any = {
      username_Change() {
        return;
      },
      password_Change() {
        return;
      },
      login_Click() {
        return;
      },
      store: store
    };
    return render(<Login {...defaultProps} {...props} />);
  }
});
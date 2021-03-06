import React, { useEffect } from "react";
import { SignTemplate } from "../templates/signTemplate";
import { Button } from "../atoms/button/Button";
import { Title } from "./../atoms/title/Title";
import s from "../atoms/signAbout/SignAbout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getResetPasswordState } from "../../core/selectors/appSelectors";
import { useHistory, useParams } from "react-router-dom";
import { setMailResetPasswordAction } from "../../core/actions/resetPasswordActions";

export const ResetPasswordAnswer = () => {
	const { email } = useSelector(getResetPasswordState);
	const history = useHistory();
	const dispatch = useDispatch();

	const sendData = () => {
		history.push("/");
	};
	const description = (mb: string) => {
		return (
			<div style={{ marginBottom: mb, textAlign: "center" }}>
				<p className={s.text}>
					You will receive an email
					<a href={`mailto:${email.value}`} className={s.link}>
						{email.value}
					</a>
				</p>
				<p className={s.text}>with a link to reset your password</p>
			</div>
		);
	};
	useEffect(() => {
		return () => {
			dispatch(
				setMailResetPasswordAction({
					value: "",
					isValid: true,
				})
			);
		};
	}, [dispatch]);

	return (
		<div>
			<SignTemplate
				main={
					<>
						<Title title={"Reset Password"} />
						{description("20px")}
						<Button sendData={sendData} text={"Home"} />
					</>
				}
			/>
		</div>
	);
};

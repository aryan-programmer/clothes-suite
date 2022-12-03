import React, {useContext, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Btn from "../../../app/components/common/Btn";
import {DialogComponent_Props_T} from "../DialogContext";
import {CloseReason} from "./close-reason";
import {ConfirmPropsContext, DialogBasicProps} from "./DialogBasicProps.context";

export type ConfirmData_T = Partial<DialogBasicProps> & {
	titlePostfix?: string,
	body: string | JSX.Element,
};

export function Confirm (props: DialogComponent_Props_T<CloseReason, ConfirmData_T>) {
	const [show, setShow]  = useState(true);
	const ConfirmContext   = useContext(ConfirmPropsContext);
	const {
		      backdropClassName,
		      backgroundColor,
		      body,
		      className,
		      dialogClassName,
		      okBorderColor,
		      okClassName,
		      okText,
		      title,
		      titlePostfix,
		      backdrop,
		      showClose,
		      contentClassName,
		      cancelText,
		      cancelBorderColor,
		      cancelClassName,
		      ...others
	      }: ConfirmData_T = {
		...ConfirmContext,
		...props.data
	};
	const resolve          = (res: CloseReason) => {
		setShow(false);
		props.resolveResult(res);
	};
	return (
		<Modal
			backdrop={backdrop}
			show={show}
			onHide={() => resolve(CloseReason.Dismissed)}
			onExited={props.onExitTransitionFinished}
			className={`shadows-bg-${backgroundColor} ${className}`}
			contentClassName={`bg-${backgroundColor} ${contentClassName}`}
			backdropClassName={backdropClassName}
			dialogClassName={dialogClassName}
		>
			<Modal.Header closeButton={showClose} className="pb-0">
				<Modal.Title><h3 className="mb-0">{title}{titlePostfix}</h3></Modal.Title>
			</Modal.Header>
			<hr />
			<Modal.Body>{body}</Modal.Body>
			<hr />
			<Modal.Footer className="p-2 pt-0">
				<Btn
					borderColor={cancelBorderColor}
					onClick={() => resolve(CloseReason.Cancel)}
					className={cancelClassName}
					type="button">
					{cancelText}
				</Btn>
				<Btn
					borderColor={okBorderColor}
					onClick={() => resolve(CloseReason.Ok)}
					className={okClassName}
					type="button">
					{okText}
				</Btn>
			</Modal.Footer>
		</Modal>);
}

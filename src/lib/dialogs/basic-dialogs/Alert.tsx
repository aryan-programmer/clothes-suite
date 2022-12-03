import React, {useContext, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Btn from "../../../app/components/common/Btn";
import {DialogComponent_Props_T} from "../DialogContext";
import {CloseReason} from "./close-reason";
import {AlertPropsContext, DialogBasicProps} from "./DialogBasicProps.context";

export type AlertData_T = Partial<DialogBasicProps> & {
	titlePostfix?: string,
	body: string | JSX.Element,
};

export function Alert (props: DialogComponent_Props_T<CloseReason, AlertData_T>) {
	const [show, setShow] = useState(true);
	const alertContext    = useContext(AlertPropsContext);
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
		      ...others
	      }: AlertData_T  = {
		...alertContext,
		...props.data
	};
	const resolve         = (res: CloseReason) => {
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
					borderColor={okBorderColor}
					onClick={() => resolve(CloseReason.Ok)}
					className={okClassName}
					type="button">
					{okText}
				</Btn>
			</Modal.Footer>
		</Modal>);
}

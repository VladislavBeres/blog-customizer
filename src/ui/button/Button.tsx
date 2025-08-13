import { Text } from '../text';
import styles from './Button.module.scss';

export const Button = ({
	title,
	onClick,
	type,
}: {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}) => {
	// Определяем модификатор по типу кнопки
	const buttonClass =
		type === 'submit'
			? `${styles.button} ${styles.button_apply}`
			: `${styles.button} ${styles.button_clear}`;

	return (
		<button className={buttonClass} type={type} onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};

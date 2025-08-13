import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

import {
	OptionType,
	fontColors,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';

type PropsArticleParamsForm = {
	onSubmit?: (params: ArticleStateType) => void;
	onReset?: (params: ArticleStateType) => void;
	onToggle?: (params: boolean) => void;
	formOp: boolean;
};

export const ArticleParamsForm = (props: PropsArticleParamsForm) => {
	const { onSubmit, onReset, onToggle, formOp } = props;

	const formRef = useRef<HTMLBaseElement | null>(null);

	const [params, setParams] = useState({
		fontFamilyOption: fontFamilyOptions[0],
		fontColor: fontColors[0],
		backgroundColor: backgroundColors[0],
		contentWidth: contentWidthArr[0],
		fontSizeOption: fontSizeOptions[0],
	});

	useEffect(() => {
		if (!formOp) return; // чтобы не навешивать лишние обработчики, когда форма закрыта

		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				onToggle?.(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onToggle?.(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [formOp, onToggle]);

	const toggler = () => {
		onToggle?.(formOp);
	};

	const cbFonts = (option: OptionType) => {
		setParams({
			...params,
			fontFamilyOption: option,
		});
	};

	const cbColorsFont = (option: OptionType) => {
		setParams({
			...params,
			fontColor: option,
		});
	};

	const cbColorsBackground = (option: OptionType) => {
		setParams({
			...params,
			backgroundColor: option,
		});
	};

	const cbContentWidth = (option: OptionType) => {
		setParams({
			...params,
			contentWidth: option,
		});
	};

	const cbFontSize = (option: OptionType) => {
		setParams({
			...params,
			fontSizeOption: option,
		});
	};

	const submitParams = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit?.(params);
	};

	const resetStyles = () => {
		setParams(defaultArticleState);
		onReset?.(defaultArticleState);
	};

	const sidebarStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: formOp,
	});

	return (
		<>
			<ArrowButton onClick={toggler} isOpen={formOp} />
			<aside ref={formRef} className={sidebarStyle}>
				<form
					className={styles.form}
					onSubmit={submitParams}
					onReset={resetStyles}>
					<fieldset style={{ display: 'grid', gap: 'clamp(10px, 4vh, 50px)' }}>
						<Text size={31} weight={800} uppercase>
							{'Задайте параметры'}
						</Text>
						<Select
							onChange={cbFonts}
							selected={params.fontFamilyOption}
							placeholder='Open Sans'
							title='Шрифт'
							options={fontFamilyOptions}
						/>
						<RadioGroup
							onChange={cbFontSize}
							selected={params.fontSizeOption}
							name={params.fontSizeOption.className}
							title={'Размер шрифта'}
							options={fontSizeOptions}
						/>
						<Select
							onChange={cbColorsFont}
							selected={params.fontColor}
							placeholder={params.fontColor.title}
							title='Цвет шрифта'
							options={fontColors}
						/>
						<Separator />
						<Select
							onChange={cbColorsBackground}
							selected={params.backgroundColor}
							placeholder={params.backgroundColor.title}
							title='Цвет фона'
							options={backgroundColors}
						/>
						<Select
							onChange={cbContentWidth}
							selected={params.contentWidth}
							placeholder={params.contentWidth.title}
							title='Ширина контента'
							options={contentWidthArr}
						/>
					</fieldset>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

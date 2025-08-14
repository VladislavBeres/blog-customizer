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
	onChange: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onChange }: PropsArticleParamsForm) => {
	const formRef = useRef<HTMLElement | null>(null);

	const [formOpen, setFormOpen] = useState(false);
	const [params, setParams] = useState<ArticleStateType>(defaultArticleState);

	useEffect(() => {
		if (!formOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setFormOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setFormOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [formOpen]);

	const toggleForm = () => {
		setFormOpen((prev) => !prev);
	};

	const updateParam = (key: keyof ArticleStateType, option: OptionType) => {
		const newParams = { ...params, [key]: option };
		setParams(newParams);
	};

	const submitParams = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onChange(params);
	};

	const resetStyles = () => {
		setParams(defaultArticleState);
		onChange(defaultArticleState);
	};

	const sidebarStyle = clsx(styles.container, {
		[styles.container_open]: formOpen,
	});

	return (
		<>
			<ArrowButton onClick={toggleForm} isOpen={formOpen} />
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
							onChange={(opt) => updateParam('fontFamilyOption', opt)}
							selected={params.fontFamilyOption}
							placeholder='Open Sans'
							title='Шрифт'
							options={fontFamilyOptions}
						/>
						<RadioGroup
							onChange={(opt) => updateParam('fontSizeOption', opt)}
							selected={params.fontSizeOption}
							name={params.fontSizeOption.className}
							title={'Размер шрифта'}
							options={fontSizeOptions}
						/>
						<Select
							onChange={(opt) => updateParam('fontColor', opt)}
							selected={params.fontColor}
							placeholder={params.fontColor.title}
							title='Цвет шрифта'
							options={fontColors}
						/>
						<Separator />
						<Select
							onChange={(opt) => updateParam('backgroundColor', opt)}
							selected={params.backgroundColor}
							placeholder={params.backgroundColor.title}
							title='Цвет фона'
							options={backgroundColors}
						/>
						<Select
							onChange={(opt) => updateParam('contentWidth', opt)}
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

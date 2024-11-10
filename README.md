# gg-framework

Бибилиотека для создания gembler игр на react. Содержит компоненты и утилиты.

Внутри используются переменные `process.env`

- [CCS переменные](#переменные-окружения)
- [Компоненты](#компоненты):
    - [Game](#game)
    - [GameLoader](#gameloader)
    - [GameMain](#gamemain)
    - [GameError](#gameerror)
    - [Button](#button)
    - [Modal](#modal)
    - [Spinner](#spinner)
    - [Chips](#chips)
    - [Result](#result)
    - [Bet](#bet)
- [Утилиты](#утилиты):
    - [useAuth](#useauth)
    - [useTranslation](#usetranslation)
    - [useLoader](#useloader)
    - [request](#request)
- [Переменные окружения](#переменные-окружения)

## Установка

---

Чтобы установить пакет в папке с проектом:

```
npm i gg-framework react react-dom
```

## CSS переменные

```css
html {
    --gg-color-surface: #252121;
    --gg-color-background-primary: #1a202b;
    --gg-color-background-secondary: #2a3449;
    --gg-color-background-tertiary: #42516d;
    --gg-color-background-dark-blue: linear-gradient(
        166.33deg,
        #0f1928 9.83%,
        #223756 76.18%
    );
    --gg-color-text-primary: #fffffff5;
    --gg-color-text-secondary: #b1afaf;
    --gg-color-text-tertiary: #828181;
    --gg-color-text-blue: #4299fd;
    --gg-color-button-blue-primary: linear-gradient(
        90.73deg,
        #1a7aea 0.29%,
        #7bc3f7 100%
    );
    --gg-color-success: #246950;

    --gg-font-button: 1rem / 1.5 "Dela Gothic One"; /* old */
    --gg-font-h4: 1.75rem / 2.25rem "Dela Gothic One"; /* old */
    --gg-font-h3: 2.25rem / 2.75rem "Dela Gothic One"; /* old */
    --gg-font-h2: 2.5rem / 3.375rem "Dela Gothic One"; /* old */

    --gg-lk-font-caption: 0.75rem / 1rem "Geologica"; /* old */
    --gg-lk-font-button-small: 0.875rem / 1.25rem "Dela Gothic One"; /* old */
    --gg-lk-font-h4: 1.25rem / 1.75rem "Dela Gothic One"; /* old */
    --gg-lk-font-body: 1rem / 1.5rem "Geologica"; /* old */
    --gg-lk-font-body2: 0.875rem / 1.25rem "Geologica"; /* old */

    --gg-zindex-modal: 1000;
    --gg-zindex-game-main-loader: 1200;
}
```

## Компоненты

### Game

Главная компонента. Содержит важную логику, без которой не будет работать, например, переводы.

```ts
type GameProps = React.PropsWithChildren<{
    className?: string;
    transparent?: string;
}>
```

Связанные компоненты:

-  `<GameLoader />` - отображает загрузку
-  `<GameMain />` - отображает основной экран в игре
-  `<GameError />` - отображает ошибки в игре

Базовый пример использования:

```tsx
<Game>
    <GameLoader
        active={false}
        progress={1}
    />
    <GameMain active={true}>
        test
    </GameMain>
    <GameError active={false} />
</Game>
```

### GameLoader

Компонента для отображения загрузки

![screenshot](https://vladisnotlove.github.io/gg-framework/docs/game-loader.png)

```ts
type GameLoaderProps = {
    className?: string;
    active?: boolean;
    progress?: number;
}
```

### GameMain

Компонента для отображения основного экрана в игре. С возможностью показывать индикацию отправки запроса на сервер.

![screenshot](https://vladisnotlove.github.io/gg-framework/docs/game-main-1.png) ![screenshot](https://vladisnotlove.github.io/gg-framework/docs/game-main-2.png)

```ts
type GameMainProps = React.PropsWithChildren<{
	className?: string;
	active?: boolean;
	loading?: boolean;
	loadingText?: string;
}>
```

### GameError

Компонента для отображения ошибок в игре

![screenshot](https://vladisnotlove.github.io/gg-framework/docs/game-error-1.png) ![screenshot](https://vladisnotlove.github.io/gg-framework/docs/game-error-2.png)

```ts
type GameErrorProps = {
    className?: string;
    active?: boolean;
    error?: {
        type: "session";
    } | {
        type: "custom";
        text: string;
    };
};
```

### Button

![screenshot](https://vladisnotlove.github.io/gg-framework/docs/button.png)

```ts
export type ButtonProps = React.PropsWithChildren<{
    className?: string;
    onClick?: () => void;
    color?: "primary" | "success" | "neutral";
    size?: "medium" | "small";
    disabled?: boolean;
    fullWidth?: boolean;
}>
```

### Modal

Компонента для отображения модального окна без самого окна. С анимацией открытия и закрытия. По умолчанию, html редерится в body с помощью portal.

![screenshot](https://vladisnotlove.github.io/gg-framework/docs/modal.png)

```ts
type ModalProps = React.PropsWithChildren<{
    className?: string;
    open?: boolean;
    disablePortal?: boolean;
}>;
```

### Spinner

Индикатор загрузки в виде спинера

![screenshot](https://vladisnotlove.github.io/gg-framework/docs/spinner.png)

```ts
type ModalProps = React.PropsWithChildren<{
    className?: string;
    size?: number;
}>;
```

### Chips

Отображение количетсво gchip-ов

![screenshot](https://vladisnotlove.github.io/gg-framework/docs/chips.png)

```ts
type ChipsProps = {
	className?: string;
	value?: number;
	size?: "medium" | "big" | "small";
};
```

### Result

Результат выигрыша в игре

![screenshot](https://vladisnotlove.github.io/gg-framework/docs/result.png)

```ts
type ResultProps = {
    className?: string;
    open: boolean;
    onClose?: () => void;
    title?: string;
    count?: number;
    coefficient?: string;
    highScore?: boolean;
    buttonText?: string;
    buttonProps?: ButtonProps;
    backgroundImgSrc: string;
};
```

### Bet

Компонента для ввода ставки

![screenshot](https://vladisnotlove.github.io/gg-framework/docs/bet.png)

```ts
type BetProps = {
    className?: string;
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    disabled: boolean;
};
```

## Утилиты

### useAuth

```ts
export declare const useAuth: () => {
    token: string | null;
    ready: boolean;
};

```

Пример использования:

```tsx
const { token, ready } = useAuth();

useEffect(() => {
    if (ready && token) {
        GameLogicStore.prepare({ token });
        GameLogicStore.init();
    }
}, [token, ready]);
```

### useTranslation 

```ts
export declare const useTranslation: () => {
    translate: (key: string, params?: Record<string, string>) => string | undefined;
    ready: boolean;
};
```

Пример использования:

```tsx
const { translate } = useTranslation();

return <Game>
    <GameError
        active
        error={{
            type: "custom",
            text: translate("You've been AFK too long...") || "",
        }}
    />
</Game>
```


### useLoader

```ts
export declare const useLoader: () => {
    progress: number;
    ready: boolean;
    loadAsset: (payload: import("../asset").Asset) => import("../asset").Asset;
};
```

Пример использования:

```tsx
const { progress, ready: loaderReady, loadAsset } = useLoader();

useEffect(() => {
    if (loaderReady) {
        loadAsset({
            type: "image",
            url: "assets/test.png",
        });
    }
}, [loaderReady, loadAsset]);

return <Game>
    <GameLoader
        active={true}
        progress={0.2}
    />
</Game>
```

### request

Простой API клиент, который внутри использует `API_URL`. `minDelay` - это минимальная задержка между запросами с одинаковыми URL-ами

```ts
export declare const request: {
    post: <TBody = unknown, TResponse = unknown>(
        url: string,
        token: string,
        body: TBody,
        options: {
            minDelay?: number;
        } = {},
    ) => Promise<TResponse>;
};

```

```ts
// load data

type LoadDataBody = undefined;

type LoadDataResponse = {
    data: {
        balance: number;
    };
    message: string;
    session: number;
};

export const loadData = ({
    token,
    body,
}: {
    token: string;
    body: LoadDataBody;
}) => {
    return request.post<LoadDataBody, LoadDataResponse>(
        "load-grunner-data/",
        token,
        body
    );
};
```

## Переменные окружения

- `API_URL` - url для api бэкенда. Используется в `request`. Пример: `https://api-test.ludomancoin.com`
- `TOKEN` - захардкоженный токен, используемый, если нет в window. Используется в `useAuth`. ВАЖНО: не использовать в prod-е
- `TRANSLATIONS` - захардкоженный JSON переводы в виде строки, используемый, если нет в window. Используется в `useTranslation`. ВАЖНО: не использовать в prod-е
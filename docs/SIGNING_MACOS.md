# Подпись приложения Overchat для macOS

Чтобы любой человек мог открыть приложение без предупреждения «разработчик не проверен», нужно подписать его сертификатом Apple (и при желании пройти нотаризацию).

## Что нужно

1. **Apple Developer Program** — платная учётная запись ($99/год): [developer.apple.com](https://developer.apple.com/programs/).
2. **Сертификат Developer ID Application** — для распространения вне App Store (не «Apple Distribution»).

---

## Шаг 1: Создать сертификат

1. На Mac откройте **Связка ключей** (Keychain Access).
2. Меню **Связка ключей** → **Сертификатный помощник** → **Запросить сертификат у центра сертификации**.
3. Укажите email, имя, выберите «Сохранить на диск» → сохраните `.certSigningRequest`.
4. В [developer.apple.com → Certificates, IDs & Profiles](https://developer.apple.com/account/resources/certificates/list) нажмите **Create a certificate**.
5. Выберите **Developer ID Application** → загрузите CSR → скачайте `.cer`.
6. Откройте скачанный `.cer` — сертификат добавится в связку ключей.

---

## Шаг 2: Узнать имя сертификата (Signing Identity)

В Терминале выполните:

```bash
security find-identity -v -p codesigning
```

Найдите строку вида:

```
1) XXXXX "Developer ID Application: Your Name (TEAMID)"
```

Скопируйте **полное имя** в кавычках: `Developer ID Application: Your Name (TEAMID)`.

---

## Шаг 3: Сборка с подписью

Задайте переменную окружения и соберите приложение:

```bash
export APPLE_SIGNING_IDENTITY="Developer ID Application: Your Name (TEAMID)"
CI=false yarn build
```

Либо одной строкой (подставьте своё имя и TEAMID):

```bash
APPLE_SIGNING_IDENTITY="Developer ID Application: Your Name (TEAMID)" CI=false yarn build
```

Готовый DMG будет здесь:

`src-tauri/target/universal-apple-darwin/release/bundle/dmg/Overchat_*.dmg`

Такой образ уже подписан; его можно отправлять другим — при открытии не должно быть предупреждения о непроверенном разработчике.

---

## Опционально: нотаризация

Нотаризация даёт дополнительное доверие со стороны macOS (особенно в новых версиях). Нужны:

- **APPLE_ID** — email Apple ID (от учётной записи разработчика).
- **APPLE_PASSWORD** — [пароль для приложений](https://appleid.apple.com/account/manage) (не обычный пароль от Apple ID).

Перед сборкой:

```bash
export APPLE_SIGNING_IDENTITY="Developer ID Application: Your Name (TEAMID)"
export APPLE_ID="your@email.com"
export APPLE_PASSWORD="xxxx-xxxx-xxxx-xxxx"
CI=false yarn build
```

Tauri сам отправит приложение на нотаризацию после сборки.

---

## Если нет Apple Developer

Без платного аккаунта подписать приложение для «любого человека» нельзя. Получатель может открыть неподписанное приложение так:

- **Правый клик** по приложению → **Открыть** → в диалоге нажать **Открыть**,  
или в Терминале (путь замените на свой):

```bash
xattr -cr /Applications/Overchat.app
open /Applications/Overchat.app
```

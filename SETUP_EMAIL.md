# EmailJS 설정 가이드

웹사이트의 폼이 자동으로 이메일을 전송하도록 EmailJS를 설정해야 합니다.

## 1단계: EmailJS 계정 생성

1. [https://www.emailjs.com/](https://www.emailjs.com/)에 접속
2. 무료 계정 생성 (월 200개 이메일까지 무료)

## 2단계: Email Service 추가

1. EmailJS 대시보드에서 **"Email Services"** 선택
2. **"Add New Service"** 클릭
3. Gmail, Outlook 등 원하는 이메일 서비스 선택
4. `contact@premierseoul.com` 계정으로 연결
5. Service ID를 복사해둡니다 (예: `service_abc123`)

## 3단계: Email Template 생성

1. **"Email Templates"** 선택
2. **"Create New Template"** 클릭
3. 다음 내용으로 템플릿 작성:

**Template Name:** `consultation_request`

**Subject:** `{{subject}}`

**Content:**
```
New Consultation Request from Premier Seoul Website

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Service: {{service}}

Message:
{{message}}
```

4. Template ID를 복사해둡니다 (예: `template_xyz789`)

## 4단계: Public Key 가져오기

1. **"Account"** → **"General"** 선택
2. **Public Key**를 복사해둡니다 (예: `abcDEF123xyz`)

## 5단계: 코드에 키 입력

`js/script.js` 파일을 열고 다음 부분을 수정하세요:

```javascript
// 62번째 줄
emailjs.init('YOUR_PUBLIC_KEY');  // ← 여기에 Public Key 입력

// 119번째 줄
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
//          ↑ Service ID      ↑ Template ID
```

### 예시:
```javascript
emailjs.init('abcDEF123xyz');

emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

## 6단계: 테스트

1. 웹사이트를 브라우저에서 열기
2. "Get Started" 버튼 클릭
3. 폼 작성 후 Submit
4. `contact@premierseoul.com`으로 이메일이 도착하는지 확인

## 대안: Formspree (더 간단한 옵션)

EmailJS 대신 Formspree를 사용하려면:

1. [https://formspree.io/](https://formspree.io/)에서 계정 생성
2. 새 폼 생성
3. `index.html`의 form 태그를 수정:

```html
<form class="consultation-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <input type="text" name="name" placeholder="Your Name" required>
    <input type="email" name="email" placeholder="Your Email" required>
    <input type="tel" name="phone" placeholder="Phone Number" required>
    <select name="service" required>
        <option value="">Select Service</option>
        <option value="concierge">Concierge Onboarding</option>
        <option value="general">General Inquiry</option>
    </select>
    <textarea name="message" placeholder="Message" rows="4"></textarea>
    <button type="submit" class="cta-button">Submit Request</button>
</form>
```

Formspree는 설정이 더 간단하지만 EmailJS는 더 많은 커스터마이징 옵션을 제공합니다.

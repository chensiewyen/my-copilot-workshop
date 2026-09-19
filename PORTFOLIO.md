![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。專案從基本的待辦管理開始，逐步加入深色模式、篩選、資料保存與批次清除功能，並保留簡潔、可離線使用的前端架構。

## 線上展示

👉 **[https://chensiewyen.github.io/my-copilot-workshop/](https://chensiewyen.github.io/my-copilot-workshop/)**

## 功能

- 新增待辦事項，輸入空白內容時不會建立項目。
- 勾選待辦事項為已完成，完成項目會顯示刪除線並淡化文字。
- 刪除單筆待辦事項。
- 顯示整體未完成事項數量，不受目前篩選條件影響。
- 清單為空或篩選結果為空時，顯示對應的提示文字。
- 使用 `localStorage` 保存待辦事項，重新整理後資料仍會保留。
- 在淺色模式與深色模式之間切換，並保存使用者的主題偏好。
- 使用者尚未手動設定主題時，跟隨作業系統的深淺色設定。
- 依「全部」、「未完成」與「已完成」篩選待辦事項。
- 保存目前的篩選條件，重新整理後維持選擇；無效的篩選值會安全回到「全部」。
- 一次清除所有已完成事項，執行前會跳出瀏覽器確認對話框。
- 沒有已完成事項時停用「清除已完成」按鈕，並提供適當的無障礙標籤。
- 支援手機螢幕與響應式版面配置。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript。
- 不使用任何框架、套件或外部 CDN。
- 以 CSS 變數管理淺色與深色主題的配色。
- 使用瀏覽器 `localStorage` 保存待辦事項、主題偏好與篩選條件。
- 以 `textContent` 與 `createElement` 產生 DOM 內容，維持離線可開啟的單純檔案結構。

## 開發方式

這個專案在 GitHub Copilot 實戰工作坊中，透過以下方式逐步完成：

- 使用 GitHub Copilot Agent Mode，依照需求建立與迭代待辦清單 Web App。
- 設定 Microsoft Learn MCP，用於查詢 `prefers-color-scheme` 與網頁深色模式色彩對比等官方文件。
- 設定 GitHub MCP，讀取 repository 的 issues，並依 issue 內容規劃與實作修正。
- 使用 `.github/prompts/fix-issue.prompt.md` 定義從讀取 issue、提出計畫、建立分支、修改、驗證，到提交、推送與建立 Pull Request 的 agentic workflow。
- 透過 issue #2、#3 與 #4 的修正流程，實作篩選條件保存、空結果提示與清除已完成事項功能。

## 我學到什麼

- 如何使用 GitHub Copilot Agent Mode，讓 AI 依照明確需求協助建立與修改前端功能。
- 如何透過 MCP 連接 Microsoft Learn 與 GitHub，取得官方文件與 repository issue 的工作脈絡。
- 如何把重複的 issue 修復流程整理成可重複使用的 prompt 與 agentic workflow。
- 如何使用 `localStorage` 保存前端狀態，讓主題、篩選條件與待辦資料在重新整理後仍然保留。
- 如何在加入功能的同時考慮響應式設計、鍵盤與螢幕閱讀器使用情境，以及色彩對比。

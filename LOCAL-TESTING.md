# 本地测试说明

这个网站是纯静态网站，最终直接部署到 GitHub Pages，不需要 Python、Node.js 或任何服务器。Google Sheets 也由浏览器端 JavaScript 直接读取。

## 最简单的查看方式

双击 `index.html`。固定内容、图片和中英文切换都可以正常查看。

## 一次性连接 Google Sheets

1. 将 `Sandy-Website-Google-Sheets-Template.xlsx` 上传到 Google Drive，并用 Google Sheets 打开。文件可以改名，也可以放在任何文件夹；网站不依赖文件名或位置。
2. 另存为 Google 表格。转换后的这张 Google Sheet 是以后唯一需要修改的内容后台。
3. 在 Google Sheets 选择“文件 → 共享 → 发布到网络”。
4. 选择 `Services` 工作表，格式选择 `Comma-separated values (.csv)`，点击发布并复制链接。
5. 再选择 `Activities` 工作表，以相同方式发布并复制链接。
6. 这一步不会生成两个需要维护的新 CSV 文件。两个网址只是原 Google Sheet 中两个工作表的公开读取出口。
7. 不需要把整份 Google Sheet 的协作权限改成“任何人可查看”；但两个已发布工作表的内容会对互联网公开，不能放私人资料。
8. 网站源码中的 `content-config.js` 已经填入本项目的两个 CSV 地址和 Google Form：

   ```js
   window.contentConfig = {
     servicesCsvUrl: "已配置的 Services CSV 链接",
     activitiesCsvUrl: "已配置的 Activities CSV 链接",
     formUrl: "已配置的 Google Form 链接"
   };
   ```

9. 本版本已经完成配置。把本版本源码上传到网站原来的 GitHub 仓库即可，不需要再修改这个文件。
10. 以后始终修改原来的 Google Sheet，不修改 CSV。Google 的“自动重新发布”开启时，修改通常会在几分钟内出现在网站；访客刷新页面即可看到更新，不需要再次上传代码。

如果表格暂时无法访问，网站会继续显示 `data.js` 中的固定内容，不会整块空白。

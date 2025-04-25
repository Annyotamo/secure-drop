<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Cloud-Based File Management Application (Secure-Drop) </h1>
    <div >
        <h2>Overview</h2>
        <p>This project is a cloud-based web application that allows users to upload, download, and manage files (.pdf, .jpeg, .doc, ...others) securely. The application features a modern React frontend with a serverless AWS backend architecture.</p>
    </div>
    <h2>Features</h2>
    <ul>
        <li><strong>User Authentication</strong>: Secure login/signup using AWS Cognito</li>
        <li><strong>Image Management</strong>:
            <ul>
                <li>Upload files to personal S3 folders</li>
                <li>Download stored images</li>
                <li>Delete images</li>
            </ul>
        </li>
        <li><strong>Responsive UI</strong>: Built with Tailwind CSS for all device sizes</li>
        <li><strong>Optimized Performance</strong>: Vite build tool for fast development and production builds</li>
        <li><strong>State Management</strong>: TanStack Query for efficient data fetching and caching</li>
        <li><strong>Routing</strong>: TanStack Router for client-side navigation</li>
    </ul>
<h2>Technologies Used</h2>
    <div>
        <div style="color:red;">
            <h3>Frontend</h3>
            <ul>
                <li>React.js</li>
                <li>Vite (Build Tool)</li>
                <li>TanStack Router (Client-side routing)</li>
                <li>TanStack Query (Data fetching/state management)</li>
                <li>Tailwind CSS (Styling)</li>
                <li>AWS Amplify (Cognito integration)</li>
            </ul>
        </div>
        <div>
            <h3>Backend</h3>
            <ul>
                <li>AWS API Gateway (REST API endpoints)</li>
                <li>AWS Lambda (Serverless functions)</li>
                <li>Amazon S3 (Image storage)</li>
                <li>AWS Cognito (Authentication/Authorization)</li>
            </ul>
        </div>
    </div>
</body>
</html>

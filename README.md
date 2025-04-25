<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cloud-Based Image Management Application</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }
        h2 {
            color: #2980b9;
            margin-top: 25px;
        }
        h3 {
            color: #16a085;
        }
        code {
            background-color: #f0f0f0;
            padding: 2px 5px;
            border-radius: 3px;
            font-family: 'Courier New', Courier, monospace;
        }
        pre {
            background-color: #282c34;
            color: #abb2bf;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }
        .feature-box {
            background-color: #e8f4fc;
            border-left: 4px solid #3498db;
            padding: 15px;
            margin: 15px 0;
            border-radius: 0 5px 5px 0;
        }
        .tech-box {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin: 20px 0;
        }
        .tech-column {
            flex: 1;
            min-width: 250px;
            background-color: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .tech-column h3 {
            margin-top: 0;
            color: #2c3e50;
        }
        .structure {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 5px;
            font-family: monospace;
            white-space: pre;
            overflow-x: auto;
        }
        .note {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 15px 0;
            border-radius: 0 5px 5px 0;
        }
        .endpoint {
            background-color: #e2f3e9;
            padding: 10px 15px;
            border-radius: 5px;
            margin: 10px 0;
        }
        .endpoint-method {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 3px;
            font-weight: bold;
            margin-right: 10px;
            color: white;
        }
        .post { background-color: #49cc90; }
        .get { background-color: #61affe; }
        .delete { background-color: #f93e3e; }
    </style>
</head>
<body>
    <h1>Cloud-Based Image Management Application</h1>

    <div class="feature-box">
        <h2>Overview</h2>
        <p>This project is a cloud-based web application that allows users to upload, download, and manage images securely. The application features a modern React frontend with a serverless AWS backend architecture.</p>
    </div>

    <h2>Features</h2>
    <ul>
        <li><strong>User Authentication</strong>: Secure login/signup using AWS Cognito</li>
        <li><strong>Image Management</strong>:
            <ul>
                <li>Upload images to personal S3 folders</li>
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
    <div class="tech-box">
        <div class="tech-column">
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
        <div class="tech-column">
            <h3>Backend</h3>
            <ul>
                <li>AWS API Gateway (REST API endpoints)</li>
                <li>AWS Lambda (Serverless functions)</li>
                <li>Amazon S3 (Image storage)</li>
                <li>AWS Cognito (Authentication/Authorization)</li>
            </ul>
        </div>
    </div>

    <h2>Project Structure</h2>
    <div class="structure">

project-root/ ├── client/ # Frontend React application │ ├── src/ │ │ ├── components/ # Reusable UI components │ │ ├── pages/ # Application pages │ │ ├── hooks/ # Custom React hooks │ │ ├── lib/ # Utility functions, API clients │ │ ├── styles/ # Global styles │ │ ├── App.jsx # Main application component │ │ └── main.jsx # Application entry point │ ├── public/ # Static assets │ ├── vite.config.js # Vite configuration │ └── package.json # Frontend dependencies │ ├── infrastructure/ # AWS CDK or SAM templates │ ├── lambda/ # Lambda function code │ └── template.yaml # CloudFormation/SAM template │ ├── .env.example # Environment variables template └── README.md # Project documentation </div>

    <h2>Setup Instructions</h2>
    <h3>Prerequisites</h3>
    <ul>
        <li>Node.js (v16+ recommended)</li>
        <li>npm or yarn</li>
        <li>AWS account with appropriate permissions</li>
        <li>AWS CLI configured with credentials</li>
    </ul>

    <h3>Frontend Setup</h3>
    <ol>
        <li>Navigate to the client directory:
            <pre><code>cd client</code></pre>
        </li>
        <li>Install dependencies:
            <pre><code>npm install

# or

yarn install</code></pre> </li> <li>Create a <code>.env</code> file based on <code>.env.example</code> and fill in your AWS Cognito details: <pre>VITE_AWS_REGION=your_aws_region VITE_USER_POOL_ID=your_cognito_user_pool_id VITE_USER_POOL_CLIENT_ID=your_cognito_client_id VITE_API_GATEWAY_URL=your_api_gateway_endpoint</pre> </li> <li>Start the development server: <pre><code>npm run dev

# or

yarn dev</code></pre> </li> </ol>

    <h3>Backend Deployment</h3>
    <ol>
        <li>Ensure you have AWS SAM or CDK installed and configured.</li>
        <li>Navigate to the infrastructure directory:
            <pre><code>cd infrastructure</code></pre>
        </li>
        <li>Deploy the backend:
            <pre><code>sam deploy --guided

# or use CDK deploy if using AWS CDK</code></pre>

        </li>
        <li>Note the API Gateway endpoint and update your frontend <code>.env</code> file.</li>
    </ol>

    <h2>Environment Variables</h2>
    <p>The following environment variables are required:</p>

    <h3>Frontend</h3>
    <ul>
        <li><code>VITE_AWS_REGION</code>: AWS region where resources are deployed</li>
        <li><code>VITE_USER_POOL_ID</code>: Cognito User Pool ID</li>
        <li><code>VITE_USER_POOL_CLIENT_ID</code>: Cognito App Client ID</li>
        <li><code>VITE_API_GATEWAY_URL</code>: Base URL for API Gateway</li>
    </ul>

    <h3>Backend (Lambda)</h3>
    <ul>
        <li><code>BUCKET_NAME</code>: Name of the S3 bucket for image storage</li>
        <li><code>AWS_ACCOUNT_ID</code>: Your AWS account ID</li>
    </ul>

    <h2>Authentication Flow</h2>
    <ol>
        <li>User signs up/signs in via Cognito hosted UI or custom UI</li>
        <li>Upon successful authentication, Cognito returns JWT tokens</li>
        <li>Frontend stores the ID token securely</li>
        <li>All API requests include the ID token in the Authorization header</li>
        <li>API Gateway validates the token via Cognito authorizer</li>
        <li>Lambda extracts user information from the token for S3 folder operations</li>
    </ol>

    <h2>API Endpoints</h2>
    <p>All endpoints require a valid Cognito ID token in the Authorization header.</p>

    <div class="endpoint">
        <span class="endpoint-method post">POST</span> <code>/upload</code> - Upload an image to user's S3 folder
    </div>

    <div class="endpoint">
        <span class="endpoint-method get">GET</span> <code>/images</code> - List all images for the authenticated user
    </div>

    <div class="endpoint">
        <span class="endpoint-method get">GET</span> <code>/download/{imageKey}</code> - Download a specific image
    </div>

    <div class="endpoint">
        <span class="endpoint-method delete">DELETE</span> <code>/delete/{imageKey}</code> - Delete a specific image
    </div>

    <div class="note">
        <h3>Security Considerations</h3>
        <ul>
            <li>All API endpoints are protected with Cognito authorization</li>
            <li>Users can only access their own S3 folder (implemented via Lambda)</li>
            <li>ID tokens have limited expiration time</li>
            <li>S3 bucket policies restrict access to only authorized users</li>
        </ul>
    </div>

    <h2>Contributing</h2>
    <p>Contributions are welcome! Please follow these steps:</p>
    <ol>
        <li>Fork the repository</li>
        <li>Create a new feature branch</li>
        <li>Commit your changes</li>
        <li>Push to the branch</li>
        <li>Create a new Pull Request</li>
    </ol>

    <h2>License</h2>
    <p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

    <h2>Acknowledgements</h2>
    <ul>
        <li>AWS for their comprehensive cloud services</li>
        <li>TanStack for their excellent React libraries</li>
        <li>Vite team for the fantastic build tool</li>
        <li>Tailwind CSS for utility-first styling</li>
    </ul>

</body>
</html>

# PR Analysis with Flowise Agent - GitHub Actions Workflow

This workflow automatically calls your Flowise agent flow to analyze pull requests when they are opened, updated, or reopened.

## Setup Instructions

### 1. Configure GitHub Secrets

You need to set up the following secrets in your GitHub repository:

1. Go to your repository → Settings → Secrets and variables → Actions
2. Add the following repository secrets:

- `FLOWISE_URL`: The URL of your Flowise instance (e.g., `https://your-flowise-instance.com`)
- `FLOWISE_API_KEY`: Your Flowise API key for authentication
- `FLOWISE_FLOW_ID`: The ID of your Flowise flow (you can find this in the Flowise UI)

### 2. Get Your Flow ID

To find your Flow ID:

1. Open your Flowise instance
2. Navigate to your "GET-PR Agents" flow
3. Look at the URL or flow settings to find the flow ID
4. Copy this ID and add it as the `FLOWISE_FLOW_ID` secret

### 3. Configure Flowise API Key

To get your Flowise API key:

1. In your Flowise instance, go to Settings → API Keys
2. Create a new API key or use an existing one
3. Copy the key and add it as the `FLOWISE_API_KEY` secret

## How It Works

### Automatic Trigger

The workflow automatically runs when:

- A pull request is opened
- A pull request is updated (new commits pushed)
- A pull request is reopened

### Manual Trigger

You can also manually trigger the workflow with custom parameters:

1. Go to Actions tab in your repository
2. Select "PR Analysis with Flowise Agent"
3. Click "Run workflow"
4. Optionally provide custom values for owner, repo, and pull number

### Form Inputs

The workflow sends the following form inputs to your Flowise agent:

- `owner`: Repository owner (e.g., "username")
- `repo`: Repository name (e.g., "my-project")
- `pull_number`: Pull request number (e.g., 123)

## Expected Response

The workflow expects your Flowise agent to return a response with a `text` field containing the analysis results. The response will be posted as a comment on the pull request.

## Troubleshooting

### Common Issues

1. **Flow ID not found**: Make sure you've copied the correct flow ID from Flowise
2. **Authentication failed**: Verify your API key is correct and has the necessary permissions
3. **Connection refused**: Check that your Flowise URL is accessible from GitHub Actions

### Debugging

Check the workflow logs in the Actions tab to see:

- The exact curl command being executed
- The response from Flowise
- Any error messages

### Testing Locally

You can test the curl command locally:

```bash
curl -X POST "https://your-flowise-instance.com/api/v1/prediction/your-flow-id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{
    "input": {
      "owner": "your-username",
      "repo": "your-repo",
      "pull_number": 123
    }
  }'
```

## Customization

You can modify the workflow to:

- Add additional form inputs
- Change the trigger conditions
- Modify the comment format
- Add additional processing steps

## Security Notes

- Never commit API keys or sensitive URLs directly in the workflow file
- Use GitHub secrets for all sensitive configuration
- Consider using environment-specific secrets for different deployment stages

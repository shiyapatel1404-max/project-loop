# Contributing to Project LOOP

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Commit with clear messages: `git commit -m "Add feature: description"`
6. Push to your fork
7. Create a Pull Request

## Development Guidelines

### Code Style

**JavaScript/Node.js:**
- Use ESLint configuration
- Follow ES6+ standards
- Use async/await over promises
- Add JSDoc comments

**Python:**
- Follow PEP 8
- Use type hints
- Add docstrings
- Use Black formatter

**React:**
- Use functional components with hooks
- Use Redux for state management
- Follow component naming conventions
- Add propTypes validation

### Commit Messages

```
Type: Brief description

Detailed explanation of changes if needed.

Fixes #123
```

Types: feat, fix, docs, style, refactor, test, chore

### Pull Request Process

1. Update documentation
2. Add/update tests
3. Ensure all tests pass
4. Request review from maintainers
5. Address review comments
6. Squash commits if needed
7. Wait for approval and merge

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Coverage
npm run test:coverage
```

## Documentation

- Update README.md for user-facing changes
- Add inline comments for complex logic
- Update API docs for endpoint changes
- Keep CHANGELOG.md updated

## Reporting Issues

Use GitHub Issues with:
- Clear title
- Detailed description
- Steps to reproduce
- Expected vs actual behavior
- Environment info (OS, versions, etc.)

## Feature Requests

1. Search existing issues first
2. Describe the feature clearly
3. Explain the use case
4. Suggest implementation if possible

## Review Process

- Minimum 1 approval required
- All tests must pass
- Code coverage must be maintained
- Documentation must be updated

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release branch
4. Tag release: `git tag v1.0.0`
5. Push tags: `git push origin --tags`
6. Create GitHub Release

## Questions?

Open an issue or contact maintainers at support@projectloop.com

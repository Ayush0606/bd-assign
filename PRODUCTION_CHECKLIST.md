# Production Deployment Checklist

Use this checklist before deploying to production.

## Pre-Deployment

### Security
- [ ] Generated strong JWT_SECRET (64+ characters)
- [ ] Updated all environment variables in `.env` files
- [ ] Removed or disabled all test/debug accounts
- [ ] Set `NODE_ENV=production`
- [ ] Reviewed and tested rate limiting settings
- [ ] Enabled HTTPS/SSL certificates
- [ ] Configured firewall rules
- [ ] Set secure MongoDB user with minimal permissions
- [ ] Removed all `console.log` statements from production code
- [ ] Updated CORS_ORIGIN to production frontend URL

### Database
- [ ] Created production MongoDB database
- [ ] Set up database backup strategy
- [ ] Configured MongoDB Atlas network access rules
- [ ] Created indexes for performance
- [ ] Tested database connection from production server

### Backend
- [ ] Installed production dependencies (`npm install --production`)
- [ ] Tested all API endpoints
- [ ] Verified authentication flows
- [ ] Tested role-based access control
- [ ] Checked error handling
- [ ] Reviewed and tested validation rules
- [ ] Configured proper logging
- [ ] Set up process manager (PM2 or similar)

### Frontend
- [ ] Updated API URL to production backend
- [ ] Built production bundle (`npm run build`)
- [ ] Tested production build locally
- [ ] Optimized images and assets
- [ ] Verified all API calls work with production backend
- [ ] Tested responsive design on multiple devices
- [ ] Checked browser compatibility
- [ ] Tested dark mode feature

### Infrastructure
- [ ] Domain name configured
- [ ] DNS records set up correctly
- [ ] SSL certificate installed and auto-renewal configured
- [ ] Server resources adequate (CPU, RAM, disk space)
- [ ] Configured reverse proxy (Nginx/Apache)
- [ ] Set up CDN (if needed)
- [ ] Configured monitoring and alerts

## Deployment

### Backend Deployment
- [ ] Deployed backend to production server
- [ ] Verified backend health endpoint responds
- [ ] Checked server logs for errors
- [ ] Tested API endpoints in production
- [ ] Verified Swagger documentation is accessible

### Frontend Deployment
- [ ] Deployed frontend to hosting platform
- [ ] Verified frontend loads correctly
- [ ] Tested all routes and navigation
- [ ] Checked API integration
- [ ] Verified static assets load correctly

## Post-Deployment Testing

### Functional Testing
- [ ] User registration works
- [ ] User login works
- [ ] JWT token is stored and used correctly
- [ ] Protected routes require authentication
- [ ] User can create tasks
- [ ] User can view their tasks
- [ ] User can edit tasks
- [ ] User can delete own tasks
- [ ] Admin can delete any task
- [ ] Pagination works correctly
- [ ] Dark mode toggle works
- [ ] Logout works correctly

### Security Testing
- [ ] Cannot access protected routes without token
- [ ] Invalid tokens are rejected
- [ ] Rate limiting is working
- [ ] CORS is properly configured
- [ ] SQL/NoSQL injection prevented
- [ ] XSS protection working
- [ ] HTTPS enforced

### Performance Testing
- [ ] API response times acceptable (<500ms)
- [ ] Frontend loads quickly (<3s)
- [ ] Database queries optimized
- [ ] No memory leaks
- [ ] Server handles expected load

## Monitoring Setup

- [ ] Set up uptime monitoring
- [ ] Configured error tracking (e.g., Sentry)
- [ ] Set up performance monitoring
- [ ] Configured log aggregation
- [ ] Set up backup monitoring
- [ ] Created alerting rules
- [ ] Documented monitoring dashboards

## Documentation

- [ ] Updated README with production URLs
- [ ] Documented environment variables
- [ ] Created runbook for common issues
- [ ] Documented deployment process
- [ ] Created rollback procedure
- [ ] Documented API changes (if any)

## Post-Launch

- [ ] Announced launch to stakeholders
- [ ] Monitored errors and performance for first 24 hours
- [ ] Collected user feedback
- [ ] Planned first maintenance window
- [ ] Scheduled regular security audits

## Rollback Plan

If something goes wrong:

1. [ ] Rollback deployment documented
2. [ ] Database backup verified and tested
3. [ ] Previous version images/builds available
4. [ ] Rollback tested in staging environment
5. [ ] Team knows how to execute rollback

## Regular Maintenance (Schedule)

### Daily
- [ ] Check error logs
- [ ] Monitor uptime
- [ ] Check disk space

### Weekly
- [ ] Review performance metrics
- [ ] Check security alerts
- [ ] Review user feedback

### Monthly
- [ ] Update dependencies
- [ ] Security audit
- [ ] Database cleanup
- [ ] Review and rotate logs

### Quarterly
- [ ] Disaster recovery test
- [ ] Performance optimization review
- [ ] Security penetration testing
- [ ] Infrastructure scaling review

---

## Emergency Contacts

Document your team's emergency contact information:

- DevOps Engineer: _________________
- Backend Developer: _________________
- Frontend Developer: _________________
- Database Admin: _________________
- On-call Manager: _________________

## External Services

Document credentials location (use password manager):

- MongoDB Atlas: _________________
- Hosting Provider: _________________
- Domain Registrar: _________________
- SSL Certificate Provider: _________________
- Monitoring Service: _________________

---

**Last Updated:** [Date]
**Reviewed By:** [Name]
**Next Review:** [Date]

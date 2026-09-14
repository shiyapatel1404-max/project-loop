-- Insert sample organization
INSERT INTO organizations (name, slug, description) VALUES 
('Demo Company', 'demo-company', 'Sample organization for testing');

-- Insert sample users
INSERT INTO users (organization_id, email, password, first_name, last_name, role) VALUES 
(1, 'admin@example.com', '$2b$10$nOQvOP4Yq210yJYWF3HBeODkh0H6GU0wnXUjlkrsKvGRu7niA8W7.', 'Admin', 'User', 'admin'),
(1, 'manager@example.com', '$2b$10$nOQvOP4Yq210yJYWF3HBeODkh0H6GU0wnXUjlkrsKvGRu7niA8W7.', 'Manager', 'User', 'manager'),
(1, 'analyst@example.com', '$2b$10$nOQvOP4Yq210yJYWF3HBeODkh0H6GU0wnXUjlkrsKvGRu7niA8W7.', 'Analyst', 'User', 'analyst');

-- Insert sample team
INSERT INTO teams (organization_id, name, description) VALUES 
(1, 'Support Team', 'Customer support team');

-- Insert sample feedback
INSERT INTO feedback (organization_id, content, source, customer_name, sentiment, confidence, status) VALUES 
(1, 'Great product! Very satisfied with the service.', 'email', 'John Doe', 'positive', 0.95, 'new'),
(1, 'The app crashed multiple times today.', 'chat', 'Jane Smith', 'negative', 0.92, 'new'),
(1, 'It works as expected.', 'survey', 'Bob Johnson', 'neutral', 0.87, 'new');

export default function Activity({ activity }) {
  if (activity.length === 0) return null;
  return (
    <section className="section" style={{animationDelay: '0.3s'}}>
      <h2 className="section-title">Recent Activity</h2>
      <div className="timeline">
        {activity.map(event => {
          const date = new Date(event.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          let action = 'Contributed to';
          if (event.type === 'PushEvent') action = 'Pushed commits to';
          if (event.type === 'PullRequestEvent') action = 'Opened a pull request in';
          if (event.type === 'IssuesEvent') action = 'Interacted with an issue in';
          if (event.type === 'ReleaseEvent') action = 'Created a release in';
          
          return (
            <div className="timeline-item" key={event.id}>
              <div className="timeline-date">{date}</div>
              <div className="timeline-content">
                {action} <a href={`https://github.com/${event.repo.name}`} target="_blank" rel="noreferrer" className="timeline-repo">{event.repo.name}</a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

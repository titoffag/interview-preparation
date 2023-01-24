* General requirements
1. support different views (year/month/day)
2. multiuser support (live-event invites, user invites)
3. event view (check the details) + support conflicting events
4. export/import events
5. creating reminders that are pushed to user device

* Functional requirements
1. Mobile-first - we need to optimize for battery life and efficient data model
2. Bridging native capabilities via any native framework
3. Efficient rendering - changing the year or the week should be quick. We want user not feel any loads
4. Accessibility

* Plan
1. Layout overview (year/month/week/day)
2. data model and api design
3. data transferring protocol overview
4. rendering optimization
5. accessibility
6. notifications & bridging native capabilities
7. app bundle optimization

* Data Model
1. Model compatibility - the same data entities for all the views
2. JSON Friendly - data format should be easily serializable/deserializable to support export/import operations
3. Limited store mutability
4. Data should be easily accessible w/o additional operations
5. Minimal transformation from the server representation
6. We need to support event conflicting detection and somehow understand that this event spans across multiple days/months

* Api design

link preconnect - non-critical resources

getStaticProps
getServerSideProps
getInitialProps

### **Indian Agriculture Data Analytics**

This project utilizes TypeScript and React to perform analytics on Indian agriculture data obtained from the National Data and Analytics Platform, NITI Aayog. The goal is to aggregate and display information in two tables using Mantine v7 for UI components.

#### **Table 1: Crops Production Summary**
This table displays the crop with maximum and minimum production for each year between 1950 and 2020.

#### **Table 2: Crops Average Yield and Cultivation Area**
This table shows the average yield (in Kg/Ha) and average cultivation area (in Ha) for each crop between 1950 and 2020.

#### **Installation and Setup**
Clone the repository:

```bash
git clone https://github.com/yogayataverma/Indian_Agriculture.git
cd indian-agriculture-analytics
```

#### **Install dependencies:**
Ensure you have Yarn installed. If not, you can install it from Yarn Installation.

```bash
Copy Code
yarn install
```
Run the project:

```bash
Copy code
yarn start
```
This will start the development server and automatically open the application in your default browser.

#### **Screenshots**
![image](https://github.com/yogayataverma/Indian_Agriculture/assets/63913693/fd24a5d0-182f-4aaa-b472-4018db743910)

![image](https://github.com/yogayataverma/Indian_Agriculture/assets/63913693/d77f918b-84d0-476a-b6bb-c0288b129a01)

#### **Folder Structure**
Copy code
- src/
  - components/
    - AnalyticsTables.tsx
  - data/
    - agricultureData.ts (sample data)
  - utils/
    - aggregation.ts
- public/
  - index.html
- README.md

#### **Implementation Details**
Data Handling: The data is imported from agricultureData.ts, where it is processed using functions in aggregation.ts to compute required aggregates.

React Components: AnalyticsTables.tsx renders two tables using Mantine v7 for UI components. Data is fetched and aggregated using React hooks (useMemo) and then displayed using react-table.

TypeScript: Strongly typed with interfaces defined for data structures (AggregatedData, CropSummary) and functions (aggregateTable1Data, aggregateTable2Data).

Code Quality: Follows modular structure, with clear comments where necessary to explain complex logic.

Notes
This project adheres strictly to using TypeScript and React via CRA, with Yarn as the package manager. No additional libraries like Bootstrap, jQuery, or Lodash are used to maintain simplicity and reduce unnecessary dependencies.

The tables are designed to display accurate calculations for maximum, minimum, average yield, and average cultivation area for each crop over the specified years.

Feedback
For any questions or feedback, please contact [yogayatajugnu@gmail.com].

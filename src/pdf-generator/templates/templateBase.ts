//templates.ts
export function htmlTemplate(month:string){
//You can pass data as arguments into this and use them inside the template as per your requirement
return`
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h1 {
            text-align: center;
            color: #333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #f4f4f4;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
    </style>
</head>
<body>
    <h1>Report Summary of the month of ${month}</h1>
    <table>
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Department</th>
            <th>Salary</th>
        </tr>
        <tr>
            <td>John Doe</td>
            <td>30</td>
            <td>Engineering</td>
            <td>$70,000</td>
        </tr>
        <tr>
            <td>Jane Smith</td>
            <td>28</td>
            <td>Marketing</td>
            <td>$65,000</td>
        </tr>
        <tr>
            <td>Robert Brown</td>
            <td>35</td>
            <td>HR</td>
            <td>$60,000</td>
        </tr>
    </table>
</body>
</html>

`
}
const Table = ({ columns, rows }) => <table>
    <thead>
        <tr>
            {columns.map((e) => <th key={e.name}>{e.name}</th>)}
        </tr>
    </thead>
    <tbody>
        {rows.map((row,i) => <tr key={i}>{row['f'].map((data, j) => <td key={j}>{data['v']}</td>)}</tr>)}
    </tbody>
</table>;

export default Table;
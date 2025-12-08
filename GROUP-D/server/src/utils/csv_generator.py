import csv
from io import StringIO


def generate_csv(headers: list, rows: list):
    """
    Generate CSV file content.

    Args:
        headers (list): CSV header titles
        rows (list): list of dicts or lists representing data rows

    Returns:
        str: CSV string
    """

    output = StringIO()
    writer = csv.writer(output)

    # Write header
    writer.writerow(headers)

    # Write rows
    for row in rows:
        if isinstance(row, dict):
            writer.writerow([row.get(h, "") for h in headers])
        else:
            writer.writerow(row)

    return output.getvalue()

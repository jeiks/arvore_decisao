// adapted from W3Schools example
		function sortTable(table, n) {
			var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
			//table = document.getElementById("myTable");
			//table = document.getElementsByTagName('table')[0];
			switching = true;
			dir = "asc";
			while (switching) {
				switching = false;
				rows = table.rows;
				for (i = 1; i < (rows.length - 1); i++) {
					shouldSwitch = false;
					x = rows[i].getElementsByTagName("TD")[n];
					y = rows[i + 1].getElementsByTagName("TD")[n];
					let text_x = x.innerHTML,
						text_y = y.innerHTML;
					if (dir == "asc") {
						if (isNaN(text_x) || isNaN(text_y)) {
							if (text_x.toLowerCase() > text_y.toLowerCase()) {
								shouldSwitch = true;
								break;
							}
						}else{
							if (parseFloat(text_x) > parseFloat(text_y)) {
								shouldSwitch = true;
								break;
							}
						}
					} else if (dir == "desc") {
						if (isNaN(text_x) || isNaN(text_y)) {
							if (text_x.toLowerCase() < text_y.toLowerCase()) {
								shouldSwitch = true;
								break;
							}
						}else{
							if (parseFloat(text_x) < parseFloat(text_y)) {
								shouldSwitch = true;
								break;
							}
						}
					}
				}
				if (shouldSwitch) {
					rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
					switching = true;
					switchcount ++;
				} else {
					if (switchcount == 0 && dir == "asc") {
						dir = "desc";
						switching = true;
					}
				}
			}
		}

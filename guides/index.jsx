/*

 @name Create Guides
 @author Park Wanho <wanho1108@gmail.com>

 */

if(app.documents.length > 0) {

	/* Window Dialog */
	var window = new Window('dialog', 'Create Guides');

	/*try {

		alert(app.activeDocument.selection.bounds);

	} catch(e) {

		alert('[TM] no selection');

	}*/

	// app.activeDocument.selection.deselect();
	// app.activeDocument.selection.deselect();
	// alert(app.activeDocument.selection.bounds);
	// alert(app.activeDocument.selection.bounds[0]); xLeft
	// alert(app.activeDocument.selection.bounds[2]); xRight

	/* Controller Panel */
	window.controllerPanel = window.add('panel', undefined, 'Controller');
	window.controllerPanel.margins = 25;

	/* Grid Group */
	window.controllerPanel.gridGroup = window.controllerPanel.add('group');
	window.controllerPanel.gridGroup.alignment = [ 'left', 'top' ];
	window.controllerPanel.gridGroup.gridWidthLabel = window.controllerPanel.gridGroup.add('statictext', [0, 0, 110, 18], 'Grid Width');
	window.controllerPanel.gridGroup.gridWidthInput = window.controllerPanel.gridGroup.add('edittext', [0, 0, 50, 18], '1000')
	window.controllerPanel.gridGroup.gridMarginLabel = window.controllerPanel.gridGroup.add('statictext', [0, 0, 110, 18], 'Grid Margin');
	window.controllerPanel.gridGroup.gridMarginLabel.y = 50;
	window.controllerPanel.gridGroup.gridMarginInput = window.controllerPanel.gridGroup.add('edittext', [0, 0, 50, 18], '30');

	/* Grid Column Group */
	window.controllerPanel.gridColumnGroup = window.controllerPanel.add('group');
	window.controllerPanel.gridColumnGroup.gridColumnsLabel = window.controllerPanel.gridColumnGroup.add('statictext', [0, 0, 110, 18], 'Grid Column(s)');
	window.controllerPanel.gridColumnGroup.gridColumnsInput = window.controllerPanel.gridColumnGroup.add('edittext', [0, 0, 50, 18], '12');
	window.controllerPanel.gridColumnGroup.gridColumnMarginLabel = window.controllerPanel.gridColumnGroup.add('statictext', [0, 0, 110, 18], 'Grid Column Margin');
	window.controllerPanel.gridColumnGroup.gridColumnMarginInput = window.controllerPanel.gridColumnGroup.add('edittext', [0, 0, 50, 18], '10');

	/* Submit Group */
	window.submitGroup = window.add('group');
	window.submitGroup.btnOk = window.submitGroup.add('button', undefined, 'Ok');
	window.submitGroup.btnCancel = window.submitGroup.add('button', undefined, 'Cancel');

	/* Event Create Guide */
	window.submitGroup.btnOk.onClick = function() {

		var document = app.activeDocument,
				documentWidth = document.width.value;

		var integerReg = /^[0-9]*$/;

		var gridWidthOrigin = parseInt(window.controllerPanel.gridGroup.gridWidthInput.text),
				gridMargin = parseInt(window.controllerPanel.gridGroup.gridMarginInput.text),
				gridWidth = parseInt(gridWidthOrigin - (gridMargin * 2)),
				gridColumns = parseInt(window.controllerPanel.gridColumnGroup.gridColumnsInput.text),
				gridColumnMargin = parseInt(window.controllerPanel.gridColumnGroup.gridColumnMarginInput.text),gridColumnMarginSum = parseInt((gridColumns - 1) * gridColumnMargin),
				gridColumnWidthTotal = parseInt(gridWidth - gridColumnMarginSum),
				gridColumnWidth = gridColumnWidthTotal / gridColumns;

		//alert('[TM] Grid Column Width : ' + gridColumnWidth);
		//alert('[TM] DocumentWidth : ' + documentWidth);

		if(documentWidth < gridWidthOrigin || gridColumnWidth < 1) {
			alert('Please check the setting value.');
			return false;
		}

		if(integerReg.test(gridColumnWidth) === false) {
			//alert('[TM] gridColumnWidth Interger False');
			while(integerReg.test(gridColumnWidth) === false) {
				gridWidthOrigin = gridWidthOrigin - 1;
				gridWidth = parseInt(gridWidthOrigin - (gridMargin * 2));
				gridColumnWidthTotal = parseInt(gridWidth - gridColumnMarginSum);
				gridColumnWidth = gridColumnWidthTotal / gridColumns;
				if(gridColumnWidth < 1) {
					alert('Please check the setting value.');
					return false;
				}
			}
			//alert('[TM] Grid Width : ' + gridWidth);
			//alert('[TM] Grid Column Width : ' + gridColumnWidth);
			if(confirm('Change Grid Width ? ' + gridWidthOrigin) === false) {
				return false;
			}
		}

		var gridStartPoint = parseInt((documentWidth - gridWidthOrigin) / 2);

		// alert('[TM] ' + gridWidthOrigin + ' = ' + (gridColumnWidth * gridColumns) + ' + ' + (gridColumnMargin * (gridColumns-1) + ' + ' + (gridMargin*2)));

		/* Draw Grid Width */
		document.guides.add(Direction.VERTICAL, gridStartPoint);
		document.guides.add(Direction.VERTICAL, gridStartPoint + gridWidthOrigin);

		/* Draw Grid Columns */
		for(var i = 0; i < gridColumns; i++) {
			var gridColumnStartPoint = gridStartPoint + gridMargin + (gridColumnWidth * i) + (gridColumnMargin * i),
					gridColumnEndPoint = gridColumnStartPoint + gridColumnWidth;
			document.guides.add(Direction.VERTICAL, gridColumnStartPoint);
			document.guides.add(Direction.VERTICAL, gridColumnEndPoint);
		}

		window.hide();

	};

	/* window show */
	window.show();

} else {

	alert('Please open a file and try.');

}
	$(document).ready(function() {
			$('#fullpage').fullpage({
				anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage', '5thPage','6thpage','7thpage','8thpage'],
				sectionsColor: ['#C63D0F', '#000000','#000000','#000000','#000000','#000000','#000000','#000000'],
				navigation: true,
				navigationPosition: 'left',
				navigationTooltips: ['Main page', '2nd', '3nd','4th','5th','6th','7th','8th']
			});
		});
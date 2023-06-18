function Start()
{
	$("#inicio").hide();

	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
	$("#fundoGame").append("<div id='placar'></div>");
	$("#fundoGame").append("<div id='energia'></div>");
	
	var somDisparo=document.getElementById("somDisparo");
	var somExplosao=document.getElementById("somExplosao");
	var musica=document.getElementById("musica");
	var somGameover=document.getElementById("somGameover");
	var somPerdido=document.getElementById("somPerdido");
	var somResgate=document.getElementById("somResgate");

	var velocidadeInimigo1 = 5;
	var velocidadeInimigo2 = 5;
	var velocidadeAmigo = 3;
	var posicaoYInimigo1 = parseInt(Math.random() * 334);
	var podeAtirar = true;
	var fimdejogo = false;
	var pontos=0;
	var salvos=0;
	var perdidos=0;
	var energiaAtual=3;

	var jogo = {};
	var TECLA = 
		{
			W: 87,
			S: 83,
			A: 65,
			D: 68,
			SPACE: 32

		}
	
	jogo.pressionou = [];


	$(document).keydown(function(e){
	jogo.pressionou[e.which] = true;
	});
	
	
	$(document).keyup(function(e){
	jogo.pressionou[e.which] = false;
	});

	jogo.timer = setInterval(Loop,30);

	function Loop()
	{
		MoveFundo();
		MoveJogador();
		MoveInimigo1();
		MoveInimigo2();
		MoveAmigo();
		Colisao();
		Placar();
		Energia();
		musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
		musica.play();
	}


	function MoveFundo()
	{
		moveParaEsquerda = parseInt($("#fundoGame").css("background-position"));
		$("#fundoGame").css("background-position",moveParaEsquerda-1);
	}

	function MoveJogador() 
	{
		if (jogo.pressionou[TECLA.W]) {
			
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top",topo-10);
			if (topo<=0)
			{
				$("#jogador").css("top",topo);
			}
		}
		
		if (jogo.pressionou[TECLA.S]) {
			
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top",topo+10);
			if (topo>=434) 
			{	
				$("#jogador").css("top",topo);	
			}
		}
		
		if (jogo.pressionou[TECLA.D]) {
			var movePlayerEsquerda = parseInt($("#jogador").css("left"));
			$("#jogador").css("left",movePlayerEsquerda+10);
			if(movePlayerEsquerda >= 700)
			{
				$('#jogador').css("left",movePlayerEsquerda);
			}
		}

		if (jogo.pressionou[TECLA.A]) {
			var movePlayerEsquerda = parseInt($("#jogador").css("left"));
			$("#jogador").css("left",movePlayerEsquerda-10);
			if(movePlayerEsquerda <= 0)
			{
				$('#jogador').css("left",movePlayerEsquerda);
			}
		}

		if (jogo.pressionou[TECLA.SPACE]) {
			Disparo();
		}
	}

	function MoveInimigo1() 
	{
		posicaoXInimigo1 = parseInt($("#inimigo1").css("left"));
		$("#inimigo1").css("left",posicaoXInimigo1-velocidadeInimigo1);
		$("#inimigo1").css("top",posicaoYInimigo1);
		
		if (posicaoXInimigo1 <= 0) 
		{
			posicaoYInimigo1 = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoYInimigo1);
		}
	}

	function MoveInimigo2()
	{
		var posicaoXinimigo2 = parseInt($("#inimigo2").css("left"))
		$("#inimigo2").css("left",posicaoXinimigo2 - velocidadeInimigo2)

		if(posicaoXinimigo2 <= 0)
		{
			$("#inimigo2").css("left",775);
		}
	}

	function MoveAmigo()
	{
		var posicaoXAmigo = parseInt($("#amigo").css("left"))
		$("#amigo").css("left", posicaoXAmigo + velocidadeAmigo)
		if(posicaoXAmigo >= 900)
		{
			$("#amigo").css("left",0);
		}
	}

	function Disparo()
	{
		if(podeAtirar == true)
		{
			podeAtirar = false;
			somDisparo.play();
			playerTopPos = parseInt($("#jogador").css("top"));
			playerXPos = parseInt($("#jogador").css("left"));
			tiroXPos = playerXPos + 190;
			tiroTopoPos = playerTopPos + 40;
			$("#fundoGame").append("<div id='disparo'></div>")
			$("#disparo").css("top",tiroTopoPos);
			$("#disparo").css("left",tiroXPos);

			var tempoDisparo = window.setInterval(ExecutarDisparo,30);
			
		}
		function ExecutarDisparo()
		{
			posicaoXTiro = parseInt($("#disparo").css("left"));
			$("#disparo").css("left",posicaoXTiro + 15);
			if(posicaoXTiro >= 900)
			{
				window.clearInterval(tempoDisparo);
				tempoDisparo = null;
				$("#disparo").remove();
				podeAtirar = true;
			}
		}
	}
	
	function Colisao()
	{
		var colisao1 = ($("#jogador").collision($("#inimigo1")));
		var colisao2 = ($("#jogador").collision($("#inimigo2")));
		var colisao3 = ($("#disparo").collision($("#inimigo1")));
		var colisao4 = ($("#disparo").collision($("#inimigo2")));
		var colisao5 = ($("#jogador").collision($("#amigo")));
		var colisao6 = ($("#inimigo2").collision($("#amigo")));

		// jogador com o inimigo1
		if(colisao1.length > 0)
		{
			energiaAtual--;
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));
			explosao1(inimigo1X,inimigo1Y);

			posicaoYInimigo1 = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",690);
			$("#inimigo1").css("top",posicaoYInimigo1);
		}

		// jogador com o inimigo2 
		if (colisao2.length>0) 
		{
			energiaAtual--;
	
			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));
			explosao2(inimigo2X,inimigo2Y);
					
			$("#inimigo2").remove();
				
			reposicionaInimigo2();
				
		}	

		// Disparo com o inimigo1
		
		if (colisao3.length>0) 
		{
			pontos=pontos+100;
			velocidadeInimigo1 =velocidadeInimigo1+0.3;
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));
				
			explosao1(inimigo1X,inimigo1Y);
			$("#disparo").css("left",950);
				
			posicaoYInimigo1 = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",690);
			$("#inimigo1").css("top",posicaoYInimigo1);
			
		}

		// Disparo com o inimigo2
		
		if (colisao4.length>0) 
		{
			velocidadeInimigo2 = velocidadeInimigo2+0.1;
			pontos=pontos+50;
			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));
			$("#inimigo2").remove();
		
			explosao2(inimigo2X,inimigo2Y);
			$("#disparo").css("left",950);
			
			reposicionaInimigo2();
				
		}

		// jogador com o amigo
		if (colisao5.length>0) 
		{
			somResgate.play();
			salvos++;
			reposicionaAmigo();
			$("#amigo").remove();
		}

		//Inimigo2 com o amigo
		
		if (colisao6.length>0) 
		{
			perdidos++;
			amigoX = parseInt($("#amigo").css("left"));
			amigoY = parseInt($("#amigo").css("top"));
			explosao3(amigoX,amigoY);
			$("#amigo").remove();
					
			reposicionaAmigo();
					
		}

	}

	function explosao1(inimigo1X,inimigo1Y) 
	{
		somExplosao.play();
		$("#fundoGame").append("<div id='explosao1'></div");
		$("#explosao1").css("background-image", "url(explosao.png)");
		var divExplosion = $("#explosao1");
		divExplosion.css("top", inimigo1Y);
		divExplosion.css("left", inimigo1X);
		divExplosion.animate({width:200, opacity:0}, "slow");
		
		var tempoExplosao = window.setInterval(removeExplosao, 1000);
		
		function removeExplosao() 
		{
			divExplosion.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao=null;
			
		}
	}
		
	function explosao2(inimigo2X,inimigo2Y) 
	{
	
		somExplosao.play();
		$("#fundoGame").append("<div id='explosao2'></div");
		$("#explosao2").css("background-image", "url(explosao.png)");
		var div2=$("#explosao2");
		div2.css("top", inimigo2Y);
		div2.css("left", inimigo2X);
		div2.animate({width:200, opacity:0}, "slow");
		
		var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
		
		function removeExplosao2() 
		{
			
			div2.remove();
			window.clearInterval(tempoExplosao2);
			tempoExplosao2=null;
			
		}	
	}

		
	function explosao3(amigoX,amigoY) 
	{
		somPerdido.play();
		$("#fundoGame").append("<div id='explosao3' class='anima4'></div");
		$("#explosao3").css("top",amigoY);
		$("#explosao3").css("left",amigoX);
		var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);

		function resetaExplosao3() 
		{
			$("#explosao3").remove();
			window.clearInterval(tempoExplosao3);
			tempoExplosao3=null;
		}
	}
	
	function reposicionaInimigo2() 
	{
		var tempoColisao4 = window.setInterval(reposiciona4, 5000);
			
		function reposiciona4() 
		{
			
			window.clearInterval(tempoColisao4);
			tempoColisao4=null;
			if (fimdejogo==false) 
			{
				$("#fundoGame").append("<div id=inimigo2></div");
			}
			
		}	
	}
	
	function reposicionaAmigo() 
	{
		var tempoAmigo=window.setInterval(reposiciona6, 6000);
		function reposiciona6() 
		{
			window.clearInterval(tempoAmigo);
			tempoAmigo=null;
			if (fimdejogo==false) 
			{
				$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
			}	
		}
	}
	
	function Placar() 
	{
	
		$("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
		
	}
	
	function Energia() 
	{
	
		if (energiaAtual==3) {
			
			$("#energia").css("background-image", "url(energia3.png)");
		}
	
		if (energiaAtual==2) {
			
			$("#energia").css("background-image", "url(energia2.png)");
		}
	
		if (energiaAtual==1) {
			
			$("#energia").css("background-image", "url(energia1.png)");
		}
	
		if (energiaAtual==0) {
			
			$("#energia").css("background-image", "url(energia0.png)");
			gameOver();
			//Game Over
		}
	
	}

	function gameOver() 
	{
		fimdejogo=true;
		musica.pause();
		somGameover.play();
		
		window.clearInterval(jogo.timer);
		jogo.timer=null;
		
		$("#jogador").remove();
		$("#inimigo1").remove();
		$("#inimigo2").remove();
		$("#amigo").remove();
		
		$("#fundoGame").append("<div id='fim'></div>");
		
		$("#fim").html("<h1> Game Over </h1><p>Sua pontua��o foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
	}
}

function reiniciaJogo() {
	somGameover.pause();
	$("#fim").remove();
	Start();
	
}


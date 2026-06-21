export function PrivacyContent() {
  return (
    <div className="space-y-8 text-foreground/90">
      <div className="space-y-2 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight sm:text-3xl">
          Política de Privacidade
        </h1>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Última atualização: março de 2026
        </p>
      </div>

      <article className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
          1. Introdução
        </h2>
        <p className="text-sm leading-relaxed">
          A NexSkills, operada pela NEXFLOW, respeita sua privacidade. Esta
          Política de Privacidade explica como coletamos, usamos, armazenamos e
          protegemos suas informações ao usar nossa plataforma.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
          2. Dados que coletamos
        </h2>
        <p className="text-sm leading-relaxed">
          Coletamos apenas os dados necessários para o funcionamento da
          plataforma:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
          <li>
            <strong>Dados de cadastro:</strong> nome, endereço de email e senha
            criptografada;
          </li>
          <li>
            <strong>Dados de uso:</strong> interações com skills, buscas e
            preferências de navegação;
          </li>
          <li>
            <strong>Dados de pagamento:</strong> processados por gateways
            terceirizados, não armazenamos dados de cartão em nossos servidores;
          </li>
          <li>
            <strong>Dados técnicos:</strong> endereço IP, tipo de navegador e
            logs de acesso para segurança e melhoria do serviço.
          </li>
        </ul>
      </article>

      <article className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
          3. Como usamos seus dados
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
          <li>Autenticar seu acesso à área de membros;</li>
          <li>Gerenciar sua conta, compras e histórico de acesso;</li>
          <li>Melhorar a experiência de navegação e recomendação de skills;</li>
          <li>Enviar comunicações sobre atualizações, suporte e segurança;</li>
          <li>Cumprir obrigações legais e prevenir fraudes.</li>
        </ul>
      </article>

      <article className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
          4. Compartilhamento de dados
        </h2>
        <p className="text-sm leading-relaxed">
          Não vendemos seus dados. Podemos compartilhar informações apenas com:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
          <li>
            Provedores de serviço essenciais (hospedagem, autenticação,
            pagamento e analytics);
          </li>
          <li>Autoridades competentes, quando exigido por lei;</li>
          <li>
            Outras partes com seu consentimento prévio ou para proteger nossos
            direitos.
          </li>
        </ul>
      </article>

      <article className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
          5. Segurança da informação
        </h2>
        <p className="text-sm leading-relaxed">
          Adotamos medidas técnicas e administrativas para proteger seus dados
          contra acessos não autorizados, perda, alteração ou vazamento. Isso
          inclui criptografia de senhas, comunicação via HTTPS e monitoramento
          contínuo de nossa infraestrutura.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
          6. Cookies e tecnologias semelhantes
        </h2>
        <p className="text-sm leading-relaxed">
          Utilizamos cookies e tecnologias similares para manter sua sessão,
          entender como a plataforma é usada e melhorar nossos serviços. Você
          pode gerenciar cookies nas configurações do seu navegador, mas algumas
          funcionalidades podem ser afetadas.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
          7. Seus direitos
        </h2>
        <p className="text-sm leading-relaxed">
          Você tem o direito de acessar, corrigir, excluir ou solicitar a
          portabilidade dos seus dados pessoais. Para exercer esses direitos,
          entre em contato pelo email indicado ao final desta política.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
          8. Retenção de dados
        </h2>
        <p className="text-sm leading-relaxed">
          Mantemos seus dados apenas pelo tempo necessário para cumprir as
          finalidades descritas nesta política, ou conforme exigido por
          obrigações legais, contábeis ou regulatórias.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
          9. Alterações nesta política
        </h2>
        <p className="text-sm leading-relaxed">
          Podemos atualizar esta Política de Privacidade periodicamente. As
          mudanças serão publicadas nesta página e, quando significativas,
          notificadas por email ou na plataforma.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
          10. Contato
        </h2>
        <p className="text-sm leading-relaxed">
          Se tiver dúvidas sobre esta Política de Privacidade ou sobre o
          tratamento dos seus dados, entre em contato pelo email:{" "}
          <a
            href="mailto:nexflow2025@gmail.com"
            className="text-[#ff6b73] underline-offset-4 transition-colors hover:text-[#ff3a44] hover:underline"
          >
            nexflow2025@gmail.com
          </a>
          .
        </p>
      </article>
    </div>
  );
}
